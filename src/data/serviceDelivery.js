// References use the existing fleet register and project portfolio as their source.
export const serviceDelivery = {
  'land-acquisition': {
    video: '/hero_bg.mp4',
    fleetIds: [4, 2, 9],
    fleetIntro: 'Site preparation and access equipment supporting the transition from secured land to development readiness.',
    projectTitles: ['Integrated Mine Development'],
    steps: [
      {
        description: 'Review land records, ownership and site conditions to establish a clear starting point.',
        image: '/coral/land-acquisition-survey.jpg',
        alt: 'Surveyors checking land maps and boundaries on site',
      },
      {
        description: 'Map landowners, communities and administrative stakeholders around the project footprint.',
        image: '/coral/process/land-stakeholders.jpg',
        alt: 'Project coordinators consulting landowners over a village map',
      },
      {
        description: 'Coordinate documentation, valuation and consent tracking with the relevant project teams.',
        image: '/coral/process/land-documentation.jpg',
        alt: 'A coordinator and landowner reviewing acquisition records and consent paperwork',
      },
      {
        description: 'Sequence access, resolve outstanding records and prepare the site for development teams.',
        image: '/coral/impact-safety-team.jpg',
        alt: 'Site teams reviewing project records together before handover',
      },
    ],
  },
  'mining-workforce': {
    video: '/hero_bg.mp4',
    fleetIds: [2, 1, 4, 8],
    fleetIntro: 'The equipment our operator and maintenance teams train for, deploy with and support on site.',
    projectTitles: ['Mine Workforce Readiness', 'Open-Cast Production Operations'],
    steps: [
      {
        description: 'Source operators, technicians and supervisors against the site’s role and shift requirements.',
        image: '/coral/process/workforce-recruitment.jpg',
        alt: 'A recruiter interviewing a mining operator at a site office',
      },
      {
        description: 'Evaluate practical skills, experience and safety awareness for each operating role.',
        image: '/coral/process/workforce-assessment.jpg',
        alt: 'An assessor observing an operator inspect a wheel loader',
      },
      {
        description: 'Build task readiness through equipment familiarisation, safety training and competency checks.',
        image: '/coral/safety-training-session.jpg',
        alt: 'Mining operators practising equipment controls with a safety instructor',
      },
      {
        description: 'Mobilise teams into the roster, monitor performance and coach for continuous improvement.',
        image: '/coral/mining-workforce-team.jpg',
        alt: 'A mining crew reviewing shift assignments and field performance on site',
      },
    ],
  },
  'mining-equipment': {
    video: '/fleet_hero.mp4',
    fleetIds: [1, 2, 3, 4, 6, 7, 8, 9, 5],
    fleetIntro: 'A connected fleet for excavation, loading, haulage and support, selected around the operating plan.',
    projectTitles: ['HEMM Fleet Performance Programme', 'Open-Cast Production Operations'],
    steps: [
      {
        description: 'Match capacity and equipment combinations to geology, haul profiles and production targets.',
        image: '/coral/capabilities-overview.jpg',
        alt: 'Mine haul roads, excavators and processing infrastructure informing fleet capacity planning',
      },
      {
        description: 'Prepare machines, parts and support teams for a coordinated start on site.',
        image: '/coral/process/equipment-mobilisation.jpg',
        alt: 'An excavator arriving at a mine on a heavy transport trailer',
      },
      {
        description: 'Connect shift-level operating controls with planned maintenance and breakdown response.',
        image: '/coral/hemm-fleet-operations.jpg',
        alt: 'Excavators loading haul trucks during coordinated mine operations',
      },
      {
        description: 'Review utilisation and lifecycle cost, then plan improvements, overhauls and rebuilds.',
        image: '/coral/process/equipment-rebuild.jpg',
        alt: 'Workshop mechanics inspecting a disassembled heavy equipment engine',
      },
    ],
  },
  'mine-repurposing': {
    video: '/hero_bg.mp4',
    fleetIds: [4, 2, 8, 3],
    fleetIntro: 'Land-shaping, earthmoving and material-handling equipment supporting progressive restoration.',
    projectTitles: ['Progressive Mine Rehabilitation'],
    steps: [
      {
        description: 'Evaluate landforms, environmental conditions and opportunities for productive post-mining use.',
        image: '/coral/impact-land-restoration.jpg',
        alt: 'Environmental specialists assessing a former mine landform and vegetation',
      },
      {
        description: 'Align closure engineering, community needs and feasible end uses in a staged plan.',
        image: '/coral/eco-mine-tourism-poster.jpg',
        alt: 'A former quarry adapted into a lake with walking paths and visitor facilities',
      },
      {
        description: 'Shape stable landforms, restore drainage and topsoil, and establish vegetation as work advances.',
        image: '/coral/mine-rehabilitation.jpg',
        alt: 'Replanted terraces and restored drainage beside an active mine',
      },
      {
        description: 'Coordinate the handover and monitor environmental performance against the restoration plan.',
        image: '/coral/water-energy-stewardship.jpg',
        alt: 'An environmental technician checking water quality at a restored mine site',
      },
    ],
  },
};
