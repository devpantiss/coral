export const PROJECT_CARDS_PER_TAB = 6;

const photo = (file, imageAlt) => ({ image: `/coral/${file}`, imageAlt });

// Match imagery to the scope rather than repeating the segment hero.
const scopeImages = {
  'Land identification & verification': photo('land-acquisition-survey.jpg', 'Surveyors verifying land boundaries and maps'),
  'Stakeholder coordination': photo('process/land-stakeholders.jpg', 'Project coordinators consulting village landowners'),
  'Acquisition facilitation': photo('process/land-documentation.jpg', 'A landowner and coordinator reviewing acquisition paperwork'),
  'R&R interface': photo('community-development.jpg', 'Community members participating in livelihood skills programmes'),
  'Development handover': photo('impact-safety-team.jpg', 'Site teams coordinating project records and readiness'),
  'Governance & reporting': photo('projects/project-reporting.jpg', 'Project coordinators reviewing land records and progress reports'),
  'Operator recruitment': photo('process/workforce-recruitment.jpg', 'A recruiter interviewing a mining equipment operator'),
  'Technical manpower': photo('process/equipment-rebuild.jpg', 'Specialist maintenance personnel inspecting an engine in a workshop'),
  'Competency assessment': photo('process/workforce-assessment.jpg', 'An assessor observing an operator perform an equipment inspection'),
  'Training & certification': photo('projects/operator-training.jpg', 'An instructor coaching a trainee on a heavy equipment simulator'),
  'Workforce deployment': photo('mining-workforce-team.jpg', 'A mining crew reviewing assignments at an operating site'),
  'Productivity management': photo('impact-safety-team.jpg', 'Supervisors reviewing field performance on a tablet'),
  'Fleet planning': photo('projects/fleet-planning.jpg', 'Mining engineers comparing equipment specifications and haul routes'),
  'HEMM deployment': photo('process/equipment-mobilisation.jpg', 'An excavator arriving at a mine on a transport trailer'),
  'Operations support': photo('coral-mine-hero.png', 'Heavy equipment working across an open-cast mine'),
  'Planned maintenance': photo('process/workforce-assessment.jpg', 'A wheel loader undergoing a scheduled equipment inspection'),
  'Breakdown response': photo('projects/breakdown-response.jpg', 'Field technicians diagnosing a parked mining haul truck'),
  'Rebuild & optimisation': photo('process/equipment-rebuild.jpg', 'Mechanics overhauling a heavy equipment engine in a workshop'),
  'Closure strategy': photo('projects/closure-planning.jpg', 'Environmental planners reviewing a mine closure masterplan'),
  'Landform restoration': photo('sustainability-hero.jpg', 'Reshaped mine terraces with restored drainage and vegetation'),
  'Ecological rehabilitation': photo('mine-rehabilitation.jpg', 'Native planting and habitat recovery on former mine terraces'),
  'Adaptive reuse': photo('eco-mine-tourism-poster.jpg', 'A former quarry transformed into a lake and visitor walking trails'),
  'Community transition': photo('community-development.jpg', 'Local residents learning skills for alternative livelihoods'),
  'Post-mining monitoring': photo('water-energy-stewardship.jpg', 'An environmental technician sampling water at a mine site'),
};

export function getServiceScopeImage(title) {
  return scopeImages[title];
}

// These views keep portfolio subjects distinct from the scope previews beside them.
const portfolioImages = {
  'Integrated Mine Development': photo('mine-development-site.jpg', 'An integrated mine with terraced workings and enabling infrastructure'),
  'Open-Cast Production Operations': photo('mine-development-site.jpg', 'Active open-cast workings with haul roads and excavation equipment'),
  'HEMM Fleet Performance Programme': photo('hemm-fleet-operations.jpg', 'Excavators and haul trucks working as a coordinated production fleet'),
  'Mine Workforce Readiness': photo('safety-training-session.jpg', 'Mining operators taking part in an equipment safety training session'),
  'Progressive Mine Rehabilitation': photo('impact-land-restoration.jpg', 'Environmental teams inspecting vegetation on rehabilitated mine land'),
};

// Keep supplied portfolio records intact; unfilled slots are explicit previews.
export function getServiceProjectCards(service, projects, status) {
  const portfolioStatus = status === 'Completed' ? 'Delivered' : status;
  const listed = projects.filter(project => project.status === portfolioStatus)
    .slice(0, PROJECT_CARDS_PER_TAB)
    .map(project => ({ ...project, ...portfolioImages[project.title] }));
  const previews = Array.from({ length: PROJECT_CARDS_PER_TAB - listed.length }, (_, index) => {
    const [title] = service.scopes[index % service.scopes.length];
    return {
      title,
      ...(scopeImages[title] ?? { image: service.image, imageAlt: title }),
      placeholder: true,
      model: 'Project preview',
      location: 'Details to be added',
      description: 'Project name, location and delivery details will be added here.',
    };
  });
  return [...listed, ...previews];
}
