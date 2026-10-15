"use client";
import { useEffect, useRef } from "react";
import { useMedia } from "@/components/ui/useMedia";

// Travel page, section 1 background (client 2026-10-15): React Bits' "Color Bends"
// (reactbits.dev/backgrounds/color-bends, by David Haz, MIT + Commons Clause), ported to plain WebGL
// so the page needs no three.js. Same shader and defaults (rotation 90°, speed 0.2, band width 6,
// pointer influence and parallax), in the Travel card's sky blues. Tuned for the light page: each band
// keeps its own colour and fades into the page (the original darkens towards black, made for dark
// pages), and overlaps lighten. It draws at half resolution (the bends are soft), pauses off screen,
// leans towards the pointer, and holds still with reduced motion.

const COLORS = ["#2f7fe0", "#6fb1f5", "#a6d2ff"];
const SPEED = 0.2;
const ROTATION = 90; // degrees
const RES = 0.5; // drawing resolution, as a share of the CSS size

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
uniform vec2 uCanvas;
uniform float uTime;
uniform vec2 uRot;
uniform vec2 uPointer;
uniform vec3 uColors[3];
varying vec2 vUv;
const float BAND = 6.0;

void main() {
  float t = uTime;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * 0.05;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  q += (uPointer - rp) * 0.2;

  vec2 s = q;
  vec3 sumCol = vec3(0.0);
  float sumW = 0.0;
  float cover = 0.0;
  for (int i = 0; i < 3; i++) {
    s -= 0.01;
    vec2 r = sin(1.5 * s.yx + 2.0 * cos(s));
    float m = length(r + sin(5.0 * r.y - 3.0 * t + float(i)) / 4.0);
    float w = 1.0 - exp(-BAND / exp(BAND * m));
    sumCol += uColors[i] * w;
    sumW += w;
    cover = max(cover, w);
  }
  // Each band in its own colour; where they overlap, a little lighter
  vec3 col = sumCol / max(sumW, 0.0001);
  col = mix(col, vec3(1.0), clamp(sumW - cover, 0.0, 1.0) * 0.35);
  gl_FragColor = vec4(col * cover, cover);
}`;

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

export default function ColorBends({ className }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const still = useMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const el = box.current;
    const canvas = cv.current;
    if (!el || !canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false });
    const shader = (type: number, src: string) => {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      return sh;
    };
    const prog = gl?.createProgram();
    if (gl && prog) {
      gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
    }
    // No WebGL: the CSS fallback (soft sky glows) shows instead
    if (!gl || !prog || !gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      el.dataset.off = "";
      return;
    }
    gl.useProgram(prog);

    // One triangle that covers the canvas
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uCanvas = u("uCanvas");
    const uTime = u("uTime");
    const uPointer = u("uPointer");
    const rad = (ROTATION * Math.PI) / 180;
    gl.uniform2f(u("uRot"), Math.cos(rad), Math.sin(rad));
    gl.uniform3fv(u("uColors"), new Float32Array(COLORS.flatMap(hex)));
    gl.clearColor(0, 0, 0, 0);

    let time = 3; // seconds of animation so far (starts on a nice frame)
    const target = { x: 0, y: 0 };
    const ptr = { x: 0, y: 0 };
    const draw = () => {
      gl.uniform1f(uTime, time * SPEED);
      gl.uniform2f(uPointer, ptr.x, ptr.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      canvas.width = Math.max(1, Math.round(w * RES));
      canvas.height = Math.max(1, Math.round(h * RES));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uCanvas, w, h);
      draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Runs only while on screen (and not with reduced motion)
    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += dt;
      const k = Math.min(1, dt * 8);
      ptr.x += (target.x - ptr.x) * k;
      ptr.y += (target.y - ptr.y) * k;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && !still) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(el);

    // The bends lean towards the pointer anywhere over the hero
    const host = el.parentElement;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / (r.width || 1)) * 2 - 1;
      target.y = -(((e.clientY - r.top) / (r.height || 1)) * 2 - 1);
    };
    if (!still) host?.addEventListener("pointermove", onMove);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      host?.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [still]);

  return (
    <div ref={box} className={className} aria-hidden="true">
      <canvas ref={cv} />
    </div>
  );
}
