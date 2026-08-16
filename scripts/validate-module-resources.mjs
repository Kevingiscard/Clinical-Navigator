import { mkdir, writeFile } from "node:fs/promises";
import { moduleDefinitions, moduleResources, moduleResourceStats } from "../shared/moduleResources.ts";
import { referenceRegistry } from "../shared/referenceRegistry.ts";

const internalRoutes = new Set([
  "/fr/concevoir-un-essai", "/fr/auditer-un-essai", "/fr/probleme", "/fr/formation", "/fr/ressources", "/fr/veille", "/fr/outils", "/fr/essais-complexes", "/fr/limites",
]);
const findings = [];
const push = (kind, message, severity = "ERROR") => findings.push({ kind, message, severity });
const ids = new Set();
for (const resource of moduleResources) {
  if (ids.has(resource.id)) push("DUPLICATE_RESOURCE_ID", resource.id);
  ids.add(resource.id);
  if (!resource.title || !resource.description) push("EMPTY_RESOURCE", resource.id);
  if (resource.internalRoute && !internalRoutes.has(resource.internalRoute.split("?")[0]) && !resource.internalRoute.startsWith("/fr/modules/")) push("MISSING_INTERNAL_ROUTE", `${resource.id}: ${resource.internalRoute}`);
  if (resource.url && !/^https:\/\//.test(resource.url)) push("INVALID_EXTERNAL_URL", `${resource.id}: ${resource.url}`);
  for (const sourceId of resource.sourceIds) if (!referenceRegistry.some(reference => reference.id === sourceId)) push("MISSING_SOURCE", `${resource.id} -> ${sourceId}`);
  for (const moduleId of resource.moduleIds) if (!moduleDefinitions.some(module => module.id === moduleId)) push("MISSING_MODULE", `${resource.id} -> ${moduleId}`);
  if (resource.status === "VERIFIED" && !resource.internalRoute && !resource.url) push("VERIFIED_WITHOUT_DESTINATION", resource.id);
}
for (const module of moduleDefinitions) {
  if (!module.title || !module.description || !module.steps.length) push("EMPTY_MODULE", module.id);
  const moduleResourceIds = new Set(module.resourceIds);
  for (const resourceId of module.resourceIds) if (!ids.has(resourceId)) push("MISSING_RESOURCE", `${module.id} -> ${resourceId}`);
  for (const step of module.steps) {
    if (step.moduleId !== module.id) push("STEP_MODULE_MISMATCH", step.id);
    for (const resourceId of [...step.resourceIds, ...step.toolIds, ...step.checklistIds]) if (!moduleResourceIds.has(resourceId)) push("STEP_RESOURCE_OUTSIDE_MODULE", `${step.id} -> ${resourceId}`);
    if (step.previousStep && !module.steps.some(candidate => candidate.id === step.previousStep)) push("BROKEN_PREVIOUS_STEP", step.id);
    if (step.nextStep && !module.steps.some(candidate => candidate.id === step.nextStep)) push("BROKEN_NEXT_STEP", step.id);
  }
  for (const relatedId of module.relatedModules) if (!moduleDefinitions.some(candidate => candidate.id === relatedId)) push("MISSING_RELATED_MODULE", `${module.id} -> ${relatedId}`);
}
const report = { generatedAt: new Date().toISOString(), status: findings.some(item => item.severity === "ERROR") ? "FAIL" : findings.length ? "PASS_WITH_WARNINGS" : "PASS", stats: moduleResourceStats, modules: moduleDefinitions.length, resources: moduleResources.length, externalLinks: moduleResources.filter(resource => Boolean(resource.url)).length, findings };
await mkdir("client/public/diagnostics", { recursive: true });
await writeFile("client/public/diagnostics/module-resource-audit.json", `${JSON.stringify(report, null, 2)}\n`);
const markdown = `# Module resource audit\n\n- Status: **${report.status}**\n- Modules: **${report.modules}**\n- Resources: **${report.resources}**\n- Tools and calculators: **${report.stats.tools}**\n- Checklists: **${report.stats.checklists}**\n- Templates: **${report.stats.templates}**\n- Sources: **${report.stats.sources}**\n- Trainings: **${report.stats.trainings}**\n- External links: **${report.externalLinks}**\n- Findings: **${report.findings.length}**\n\n${report.findings.length ? report.findings.map(item => `- ${item.severity} · ${item.kind} · ${item.message}`).join("\\n") : "No broken module, resource, source, route or relation was found."}\n`;
await writeFile("client/public/diagnostics/module-resource-audit.md", markdown);
if (report.status === "FAIL") { console.error(markdown); process.exit(1); }
console.log(markdown);
