const immobileConditions = [
  'immobilized',
  'unconscious',
  'paralyzed',
  'petrified',
];

export function getSpeedForToken(token) {
  const actor = token.actor;
  const conditions = actor.conditions;

  const speed = actor.system.attributes.speed;
  const speedValue = speed?.value ?? 0;
  if (conditions.hasType('prone')) {
    // When prone, you can crawl if speed is at least 10
    if (speedValue >= 10) {
      return 5;
    } else {
      return 0;
    }
  }
  return speedValue;
}

export function getMovementActionCountForToken(token) {
  const actor = token.actor;
  const conditions = actor.conditions;

  if (immobileConditions.some(slug => conditions.hasType(slug))) {
    return 0;
  }

  let actionCount = 3;

  if (conditions.hasType('quickened')) {
    actionCount++;
  }

  actionCount -= conditions.bySlug('stunned', {active: true})[0]?.value ?? 0;
  actionCount -= conditions.bySlug('slowed', {active: true})[0]?.value ?? 0;

  return Math.max(actionCount, 0);
}
