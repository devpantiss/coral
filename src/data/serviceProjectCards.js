export const PROJECT_CARDS_PER_TAB = 6;

// Keep supplied portfolio records intact; unfilled slots are explicit previews.
export function getServiceProjectCards(service, projects, status) {
  const portfolioStatus = status === 'Completed' ? 'Delivered' : status;
  const listed = projects.filter(project => project.status === portfolioStatus).slice(0, PROJECT_CARDS_PER_TAB);
  const previews = Array.from({ length: PROJECT_CARDS_PER_TAB - listed.length }, (_, index) => {
    const [title] = service.scopes[index % service.scopes.length];
    return {
      title,
      image: service.image,
      placeholder: true,
      model: 'Project preview',
      location: 'Details to be added',
      description: 'Project name, location and delivery details will be added here.',
    };
  });
  return [...listed, ...previews];
}
