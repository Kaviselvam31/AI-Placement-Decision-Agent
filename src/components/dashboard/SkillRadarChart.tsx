import { useMemo } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { Gauge } from 'lucide-react';
import type { PlacementReport } from '../../types';

type Props = {
  report: PlacementReport;
};

export function SkillRadarChart({ report }: Props) {
  const data = useMemo(() => {
    const items = report.skillGapAnalysis.slice(0, 6);
    if (items.length === 0) return [];
    return items.map((item) => ({
      skill: item.skill.length > 14 ? item.skill.slice(0, 12) + '...' : item.skill,
      readiness: Math.max(0, 100 - item.gap),
    }));
  }, [report]);

  return (
    <Card className="overflow-hidden">
      <CardHeader icon={<Gauge className="h-5 w-5" />} title="Skill Readiness Radar" subtitle="Your current standing per skill" accent="brand" />
      <div className="px-2 pb-4 h-72">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            No skill gap data to visualize.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="70%">
              <PolarGrid stroke="rgba(148,163,184,0.25)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: 'currentColor', fontSize: 11, className: 'fill-slate-500 dark:fill-slate-400' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'currentColor', fontSize: 10, className: 'fill-slate-400' }} stroke="rgba(148,163,184,0.2)" />
              <Radar name="Readiness" dataKey="readiness" stroke="#3366ff" fill="#7c3aed" fillOpacity={0.35} strokeWidth={2} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgba(148,163,184,0.25)',
                  background: 'rgba(255,255,255,0.95)',
                  color: '#0f172a',
                  fontSize: 12,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
