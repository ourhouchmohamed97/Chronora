"use client";

import React, { useState } from "react";
import { StudyContent } from "../../../lib/openrouter";

interface StudyPlanTabProps {
  studyPlan: StudyContent["studyPlan"];
}

const taskTypeConfig = {
  read: { label: "Read", color: "bg-blue-100 text-blue-600", icon: "📖" },
  practice: { label: "Practice", color: "bg-purple-100 text-purple-600", icon: "✏️" },
  review: { label: "Review", color: "bg-amber-100 text-amber-600", icon: "🔁" },
  build: { label: "Build", color: "bg-emerald-100 text-emerald-600", icon: "🔨" },
};

export default function StudyPlanTab({ studyPlan }: StudyPlanTabProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalTasks = studyPlan.days.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasks = checked.size;
  const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
          <span className="text-sm font-bold text-amber-600">{completedTasks}/{totalTasks} tasks</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">{progressPct}% complete · {studyPlan.totalDays} day plan</p>
      </div>

      {/* Days */}
      {studyPlan.days.map((day) => {
        const dayCompleted = day.tasks.filter((t) => checked.has(t.id)).length;
        const dayDone = dayCompleted === day.tasks.length;

        return (
          <div key={day.day} className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            {/* Day header */}
            <div className={`px-5 py-4 border-b border-slate-100 flex items-center justify-between ${dayDone ? "bg-emerald-50" : "bg-slate-50"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${dayDone ? "bg-emerald-500 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
                  {dayDone ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : day.day}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Day {day.day}</p>
                  <p className="text-xs text-slate-400">{day.title}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">{dayCompleted}/{day.tasks.length}</span>
            </div>

            {/* Tasks */}
            <div className="divide-y divide-slate-50">
              {day.tasks.map((task) => {
                const isChecked = checked.has(task.id);
                const config = taskTypeConfig[task.type] ?? taskTypeConfig.read;

                return (
                  <div
                    key={task.id}
                    onClick={() => toggle(task.id)}
                    className={`flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors duration-150 ${isChecked ? "bg-slate-50/60" : "hover:bg-slate-50"}`}
                  >
                    {/* Checkbox */}
                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isChecked ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>
                          {config.icon} {config.label}
                        </span>
                        <span className="text-xs text-slate-400">{task.estimatedMinutes} min</span>
                      </div>
                      <p className={`text-sm font-semibold transition-colors ${isChecked ? "line-through text-slate-400" : "text-slate-800"}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{task.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}