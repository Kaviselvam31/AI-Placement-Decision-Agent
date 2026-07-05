import { jsPDF } from 'jspdf';
import type { PlacementReport, StudentProfile } from '../types';

const BRAND_BLUE: [number, number, number] = [51, 102, 255];
const BRAND_PURPLE: [number, number, number] = [124, 58, 237];
const SLATE_900: [number, number, number] = [15, 23, 42];
const SLATE_600: [number, number, number] = [71, 85, 105];
const SLATE_400: [number, number, number] = [148, 163, 184];
const SLATE_200: [number, number, number] = [226, 232, 240];
const WHITE: [number, number, number] = [255, 255, 255];
const GREEN: [number, number, number] = [22, 163, 74];
const AMBER: [number, number, number] = [217, 119, 6];
const RED: [number, number, number] = [220, 38, 38];

type Section = {
  title: string;
  items: string[];
};

export function generatePlacementPdf(
  report: PlacementReport,
  student: StudentProfile,
): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const drawHeader = () => {
    // Brand band
    doc.setFillColor(...BRAND_BLUE);
    doc.rect(0, 0, pageWidth, 110, 'F');
    doc.setFillColor(...BRAND_PURPLE);
    doc.rect(pageWidth * 0.62, 0, pageWidth * 0.38, 110, 'F');

    doc.setTextColor(...WHITE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Placement Decision AI', margin, 48);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Personalized Placement Readiness Report', margin, 70);

    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), pageWidth - margin, 48, { align: 'right' });
    doc.text('Confidential - For Student Use', pageWidth - margin, 70, { align: 'right' });

    y = 140;
  };

  const sectionTitle = (title: string) => {
    ensureSpace(50);
    doc.setTextColor(...BRAND_BLUE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(title, margin, y);
    doc.setDrawColor(...SLATE_200);
    doc.setLineWidth(1);
    doc.line(margin, y + 6, pageWidth - margin, y + 6);
    y += 22;
  };

  const paragraph = (text: string, color: [number, number, number] = SLATE_600) => {
    doc.setTextColor(...color);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    const lineHeight = 14;
    for (const line of lines) {
      ensureSpace(lineHeight);
      doc.text(line, margin, y);
      y += lineHeight;
    }
  };

  const bulletList = (items: string[], color: [number, number, number] = SLATE_600) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    const lineHeight = 14;
    for (const item of items) {
      const lines = doc.splitTextToSize(item, contentWidth - 18) as string[];
      ensureSpace(lines.length * lineHeight + 4);
      doc.setFillColor(...BRAND_BLUE);
      doc.circle(margin + 3, y - 3, 1.8, 'F');
      doc.setTextColor(...color);
      lines.forEach((line, i) => {
        doc.text(line, margin + 12, y + i * lineHeight);
      });
      y += lines.length * lineHeight + 4;
    }
  };

  const labeledList = (sections: Section[]) => {
    for (const section of sections) {
      ensureSpace(28);
      doc.setTextColor(...SLATE_900);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(section.title, margin, y);
      y += 16;
      bulletList(section.items);
      y += 6;
    }
  };

  drawHeader();

  // Student info card
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 92, 10, 10, 'F');
  doc.setTextColor(...SLATE_900);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(student.name || 'Student', margin + 18, y + 26);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...SLATE_600);
  const infoLine1 = `${student.department || 'Department'}  |  ${student.collegeYear || 'Year'}  |  CGPA: ${student.cgpa || 'N/A'}`;
  doc.text(infoLine1, margin + 18, y + 44);
  doc.text(`Email: ${student.email || 'N/A'}`, margin + 18, y + 60);
  doc.text(`Target Role: ${student.targetRole || 'N/A'}`, margin + 18, y + 76);
  y += 110;

  // Score + status
  const scoreColor = report.placementScore >= 75 ? GREEN : report.placementScore >= 55 ? AMBER : RED;
  doc.setFillColor(...scoreColor);
  doc.roundedRect(margin, y, 220, 80, 12, 12, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text(`${report.placementScore}`, margin + 24, y + 48);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('/ 100', margin + 24, y + 66);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Placement Score', margin + 90, y + 36);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Status: ${report.status}`, margin + 90, y + 56);

  doc.setFillColor(238, 244, 255);
  doc.roundedRect(margin + 240, y, contentWidth - 240, 80, 12, 12, 'F');
  doc.setTextColor(...BRAND_BLUE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Best Suited Role', margin + 260, y + 30);
  doc.setTextColor(...SLATE_900);
  doc.setFontSize(13);
  doc.text(report.bestRole || student.targetRole || 'N/A', margin + 260, y + 52);
  y += 110;

  sectionTitle('Executive Summary');
  paragraph(report.summary);
  y += 8;

  sectionTitle('Strengths');
  bulletList(report.strengths);
  y += 8;

  sectionTitle('Weaknesses');
  bulletList(report.weaknesses, AMBER);
  y += 8;

  sectionTitle('Missing Skills');
  if (report.missingSkills.length > 0) {
    bulletList(report.missingSkills, RED);
  } else {
    paragraph('No critical missing skills identified - focus on deepening existing knowledge.', GREEN);
  }
  y += 8;

  sectionTitle('Skill Gap Analysis');
  if (report.skillGapAnalysis.length > 0) {
    for (const gap of report.skillGapAnalysis) {
      ensureSpace(40);
      doc.setTextColor(...SLATE_900);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(gap.skill, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...SLATE_600);
      doc.text(`${gap.currentLevel} -> ${gap.requiredLevel}`, pageWidth - margin, y, { align: 'right' });
      y += 14;
      // gap bar
      const barWidth = contentWidth;
      doc.setFillColor(...SLATE_200);
      doc.roundedRect(margin, y, barWidth, 6, 3, 3, 'F');
      const fillWidth = Math.min(barWidth, (gap.gap / 100) * barWidth);
      doc.setFillColor(...(gap.importance === 'Critical' ? RED : gap.importance === 'High' ? AMBER : BRAND_BLUE));
      doc.roundedRect(margin, y, fillWidth, 6, 3, 3, 'F');
      y += 16;
      doc.setTextColor(...SLATE_600);
      doc.setFontSize(9);
      doc.text(`Importance: ${gap.importance}`, margin, y);
      y += 14;
    }
  } else {
    paragraph('No specific skill gaps identified.');
  }
  y += 8;

  sectionTitle('Recommended Companies');
  bulletList(report.recommendedCompanies);
  y += 8;

  sectionTitle('30-Day Learning Roadmap');
  for (const item of report.roadmap) {
    ensureSpace(40);
    doc.setFillColor(...BRAND_BLUE);
    doc.roundedRect(margin, y - 10, 60, 18, 4, 4, 'F');
    doc.setTextColor(...WHITE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(item.day.toUpperCase(), margin + 30, y + 2, { align: 'center' });
    doc.setTextColor(...SLATE_900);
    doc.setFontSize(11);
    doc.text(item.title, margin + 72, y + 2);
    doc.setTextColor(...SLATE_600);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(`Focus: ${item.focus}`, margin + 72, y + 16);
    y += 26;
    bulletList(item.tasks);
    y += 6;
  }
  y += 8;

  sectionTitle('Recommended Projects');
  for (const project of report.recommendedProjects) {
    ensureSpace(50);
    doc.setTextColor(...SLATE_900);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(project.title, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...SLATE_400);
    doc.text(`${project.difficulty} - ${project.estimatedTime}`, pageWidth - margin, y, { align: 'right' });
    y += 14;
    paragraph(project.description);
    doc.setTextColor(...BRAND_BLUE);
    doc.setFontSize(9.5);
    doc.text(`Tech: ${project.technologies.join(', ')}`, margin, y);
    y += 18;
  }
  y += 8;

  sectionTitle('Recommended Certifications');
  bulletList(report.recommendedCertifications);
  y += 8;

  labeledList([
    { title: 'Coding Improvement Tips', items: report.codingTips },
    { title: 'Communication Improvement Tips', items: report.communicationTips },
  ]);

  sectionTitle('Personalized Interview Questions');
  for (const q of report.interviewQuestions) {
    ensureSpace(60);
    doc.setTextColor(...BRAND_PURPLE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`[${q.category}]`, margin, y);
    doc.setTextColor(...SLATE_400);
    doc.text(q.difficulty, pageWidth - margin, y, { align: 'right' });
    y += 14;
    doc.setTextColor(...SLATE_900);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    const qLines = doc.splitTextToSize(`Q: ${q.question}`, contentWidth) as string[];
    qLines.forEach((line) => {
      ensureSpace(14);
      doc.text(line, margin, y);
      y += 14;
    });
    doc.setTextColor(...SLATE_600);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const aLines = doc.splitTextToSize(`A: ${q.sampleAnswer}`, contentWidth - 12) as string[];
    aLines.forEach((line) => {
      ensureSpace(13);
      doc.text(line, margin + 12, y);
      y += 13;
    });
    y += 8;
  }

  sectionTitle('Final Recommendation');
  paragraph(report.finalRecommendation, SLATE_900);
  y += 12;

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(...SLATE_200);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 32, pageWidth - margin, pageHeight - 32);
    doc.setTextColor(...SLATE_400);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Generated by Placement Decision AI Agent', margin, pageHeight - 18);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 18, { align: 'right' });
  }

  const safeName = (student.name || 'student').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  doc.save(`placement-report-${safeName}.pdf`);
}
