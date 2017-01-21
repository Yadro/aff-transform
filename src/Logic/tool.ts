
export function degToRad(ang) {
  return ang * Math.PI / 180;
}

export function sin(ang) {
  return Math.sin(degToRad(ang));
}

export function cos(ang) {
  return Math.cos(degToRad(ang));
}

export function tan(ang) {
  return Math.tan(degToRad(ang));
}