export function toCharacterProfile(raw) {
  return {
    id:          raw.id          ?? 0,
    name:        raw.name        ?? 'Desconocido',
    image:       raw.image       ?? '',
    ki:          raw.ki          ?? 'Desconocido',
    race:        raw.race        ?? 'Desconocido',
    gender:      raw.gender      ?? 'Desconocido',
    affiliation: raw.affiliation ?? 'Desconocido',
    description: raw.description ?? '',
  };
}
