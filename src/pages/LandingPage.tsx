import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

import {
  ArrowRight,
  CheckCircle,
  BarChart2,
  MessageSquare,
  Award,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Star,
  Shield,
  ChevronRight,
  Mail,
  Globe,
  ExternalLink,
  ClipboardCheck,
  Layers,
  Sparkles,
  Trophy,
  Menu,
  X,
  CircleCheck,
} from 'lucide-react';

import { useState } from 'react';

/* =========================================================
   COLOR PALETTE
========================================================= */

const C = {
  dark: '#042A2B',
  darkMid: '#073B3C',
  teal: '#0DABAB',
  sky: '#5EB1BF',
  yellow: '#F6E879',
  white: '#FCFCFC',

  text: '#173D3E',
  muted: '#607777',

  skyLight: 'rgba(94,177,191,0.10)',
  tealLight: 'rgba(13,171,171,0.10)',
  yellowLight: 'rgba(246,232,121,0.16)',
};

/* =========================================================
   LANDING PAGE
========================================================= */

export default function LandingPage() {
  const navigate = useNavigate();
  const setRole = useStore((state) => state.setRole);

  const [mobileMenu, setMobileMenu] = useState(false);

  const enter = (role: 'intern' | 'coordinator') => {
    if (window.innerWidth <= 768) {
      alert("Please use desktop mode for a better viewing experience.");
    }
    setRole(role);
    navigate(`/${role}`);
  };

  const closeMenu = () => setMobileMenu(false);

  return (
    <div className="landing-page">

      {/* =====================================================
          GLOBAL STYLES
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          background: ${C.white};
          color: ${C.dark};
        }

        button,
        a {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        .landing-page {
          min-height: 100vh;
          overflow-x: hidden;
          background: ${C.white};
        }

        .container {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        /* =====================================================
           NAVBAR
        ===================================================== */

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 76px;
          background: rgba(252,252,252,0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(4,42,43,0.08);
        }

        .nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          color: ${C.dark};
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${C.dark};
          color: ${C.yellow};
          box-shadow: 0 8px 24px rgba(4,42,43,0.15);
        }

        .brand-name {
          font-size: 19px;
          font-weight: 850;
          letter-spacing: -0.6px;
        }

        .brand-name span {
          color: ${C.teal};
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          color: #557070;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: 0.2s ease;
        }

        .nav-link:hover {
          color: ${C.teal};
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .nav-button {
          border-radius: 9px;
          padding: 10px 17px;
          font-size: 12px;
          font-weight: 750;
          transition: 0.2s ease;
        }

        .nav-button.outline {
          color: ${C.teal};
          background: transparent;
          border: 1px solid ${C.teal};
        }

        .nav-button.outline:hover {
          background: ${C.tealLight};
        }

        .nav-button.primary {
          color: white;
          background: ${C.teal};
          border: 1px solid ${C.teal};
          box-shadow: 0 5px 16px rgba(13,171,171,0.18);
        }

        .nav-button.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(13,171,171,0.25);
        }

        .mobile-toggle {
          display: none;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(4,42,43,0.1);
          border-radius: 10px;
          background: white;
          color: ${C.dark};
          align-items: center;
          justify-content: center;
        }

        .mobile-menu {
          display: none;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .hero {
          position: relative;
          padding: 105px 0 95px;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 85% 15%,
              rgba(94,177,191,0.15),
              transparent 32%
            ),
            radial-gradient(
              circle at 5% 80%,
              rgba(13,171,171,0.07),
              transparent 30%
            ),
            ${C.white};
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 480px;
          height: 480px;
          border: 1px solid rgba(13,171,171,0.08);
          border-radius: 50%;
          right: -220px;
          top: -180px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.03fr) minmax(430px, 0.97fr);
          gap: 75px;
          align-items: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          border-radius: 999px;
          background: ${C.yellowLight};
          border: 1px solid rgba(246,232,121,0.75);
          color: #746400;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.6px;
          margin-bottom: 24px;
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${C.teal};
          box-shadow: 0 0 0 4px rgba(13,171,171,0.10);
        }

        .hero-title {
          margin: 0;
          max-width: 690px;
          font-size: clamp(46px, 5.2vw, 70px);
          line-height: 1.01;
          letter-spacing: -3.6px;
          font-weight: 900;
          color: ${C.dark};
        }

        .hero-title span {
          color: ${C.teal};
        }

        .hero-description {
          max-width: 570px;
          margin: 27px 0 0;
          color: ${C.muted};
          font-size: 17px;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 35px;
        }

        .primary-cta,
        .secondary-cta {
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 22px;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .primary-cta {
          border: 1px solid ${C.dark};
          background: ${C.dark};
          color: white;
          box-shadow: 0 12px 28px rgba(4,42,43,0.16);
        }

        .primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 17px 35px rgba(4,42,43,0.22);
        }

        .secondary-cta {
          border: 1px solid rgba(13,171,171,0.45);
          background: white;
          color: ${C.teal};
        }

        .secondary-cta:hover {
          background: ${C.tealLight};
          transform: translateY(-2px);
        }

        .hero-note {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 27px;
          color: #718383;
          font-size: 12px;
        }

        .hero-note svg {
          color: ${C.teal};
        }

        /* =====================================================
           PREMIUM HERO DASHBOARD
        ===================================================== */

        .hero-visual {
          position: relative;
          min-height: 470px;
        }

        .dashboard-window {
          position: absolute;
          inset: 25px 0 0 35px;
          background: white;
          border: 1px solid rgba(4,42,43,0.10);
          border-radius: 22px;
          box-shadow:
            0 35px 80px rgba(4,42,43,0.14),
            0 5px 20px rgba(4,42,43,0.05);
          overflow: hidden;
        }

        .window-top {
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          border-bottom: 1px solid rgba(4,42,43,0.07);
          background: rgba(248,252,252,0.8);
        }

        .window-dots {
          display: flex;
          gap: 6px;
        }

        .window-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c8d4d4;
        }

        .window-title {
          font-size: 11px;
          font-weight: 800;
          color: ${C.dark};
        }

        .window-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          color: ${C.teal};
          font-weight: 800;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${C.teal};
        }

        .dashboard-body {
          padding: 22px;
        }

        .dashboard-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 18px;
        }

        .dashboard-heading h3 {
          margin: 0;
          font-size: 18px;
          color: ${C.dark};
        }

        .dashboard-heading p {
          margin: 4px 0 0;
          font-size: 10px;
          color: #789090;
        }

        .dashboard-date {
          padding: 7px 10px;
          border-radius: 7px;
          background: ${C.tealLight};
          color: ${C.teal};
          font-size: 9px;
          font-weight: 800;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .metric-card {
          padding: 13px;
          border: 1px solid rgba(4,42,43,0.07);
          border-radius: 11px;
          background: #fbfdfd;
        }

        .metric-icon {
          width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          margin-bottom: 10px;
        }

        .metric-card:nth-child(1) .metric-icon {
          background: ${C.tealLight};
          color: ${C.teal};
        }

        .metric-card:nth-child(2) .metric-icon {
          background: ${C.yellowLight};
          color: #907d00;
        }

        .metric-card:nth-child(3) .metric-icon {
          background: ${C.skyLight};
          color: ${C.sky};
        }

        .metric-value {
          font-size: 21px;
          font-weight: 900;
          color: ${C.dark};
        }

        .metric-label {
          margin-top: 2px;
          color: #819292;
          font-size: 9px;
          font-weight: 600;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 10px;
          margin-top: 10px;
        }

        .panel {
          padding: 15px;
          border: 1px solid rgba(4,42,43,0.07);
          border-radius: 11px;
          background: white;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .panel-header strong {
          font-size: 11px;
          color: ${C.dark};
        }

        .panel-header span {
          font-size: 8px;
          color: ${C.teal};
          font-weight: 800;
        }

        .task-row {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 0;
          border-bottom: 1px solid rgba(4,42,43,0.06);
        }

        .task-row:last-child {
          border-bottom: none;
        }

        .task-check {
          width: 21px;
          height: 21px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${C.tealLight};
          color: ${C.teal};
          flex-shrink: 0;
        }

        .task-info {
          flex: 1;
        }

        .task-info strong {
          display: block;
          color: ${C.dark};
          font-size: 9px;
        }

        .task-info span {
          color: #8a9999;
          font-size: 8px;
        }

        .task-points {
          color: ${C.teal};
          font-size: 8px;
          font-weight: 800;
        }

        .progress-circle {
          width: 88px;
          height: 88px;
          margin: 6px auto 12px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            conic-gradient(
              ${C.teal} 0 72%,
              #e8eeee 72% 100%
            );
          position: relative;
        }

        .progress-circle::before {
          content: "";
          position: absolute;
          inset: 9px;
          background: white;
          border-radius: 50%;
        }

        .progress-number {
          position: relative;
          z-index: 1;
          font-size: 17px;
          font-weight: 900;
          color: ${C.dark};
        }

        .progress-label {
          text-align: center;
          font-size: 9px;
          color: #839393;
        }

        .floating-card {
          position: absolute;
          background: white;
          border: 1px solid rgba(4,42,43,0.09);
          border-radius: 13px;
          box-shadow: 0 18px 35px rgba(4,42,43,0.12);
          padding: 12px;
        }

        .floating-card.one {
          left: -8px;
          bottom: 50px;
          width: 145px;
        }

        .floating-card.two {
          right: -12px;
          top: 4px;
          width: 145px;
        }

        .floating-label {
          font-size: 8px;
          color: #849494;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .floating-value {
          display: flex;
          align-items: center;
          gap: 7px;
          color: ${C.dark};
          font-size: 14px;
          font-weight: 900;
        }

        .floating-icon {
          width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: ${C.yellowLight};
          color: #887700;
        }

        /* =====================================================
           TRUST STRIP
        ===================================================== */

        .trust-strip {
          padding: 18px 0;
          border-top: 1px solid rgba(4,42,43,0.07);
          border-bottom: 1px solid rgba(4,42,43,0.07);
          background: #fafdfd;
        }

        .trust-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
        }

        .trust-label {
          color: #8a9999;
          font-size: 11px;
          font-weight: 700;
        }

        .trust-items {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #607575;
          font-size: 11px;
          font-weight: 700;
        }

        .trust-item svg {
          color: ${C.teal};
        }

        /* =====================================================
           SECTION COMMON
        ===================================================== */

        .section {
          padding: 110px 0;
        }

        .section.soft {
          background: #f4fafa;
        }

        .section.dark {
          background:
            radial-gradient(
              circle at 90% 20%,
              rgba(94,177,191,0.12),
              transparent 28%
            ),
            ${C.dark};
        }

        .section-header {
          max-width: 680px;
          margin: 0 auto 62px;
          text-align: center;
        }

        .section-label {
          display: block;
          margin-bottom: 12px;
          color: ${C.teal};
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .section.dark .section-label {
          color: ${C.yellow};
        }

        .section-title {
          margin: 0;
          color: ${C.dark};
          font-size: clamp(32px, 4vw, 45px);
          line-height: 1.08;
          letter-spacing: -1.8px;
          font-weight: 900;
        }

        .section.dark .section-title {
          color: white;
        }

        .section-description {
          margin: 16px auto 0;
          max-width: 570px;
          color: ${C.muted};
          font-size: 15px;
          line-height: 1.8;
        }

        .section.dark .section-description {
          color: rgba(255,255,255,0.60);
        }

        /* =====================================================
           FEATURES
        ===================================================== */

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .feature-card {
          position: relative;
          padding: 28px;
          min-height: 230px;
          border: 1px solid rgba(4,42,43,0.08);
          border-radius: 17px;
          background: white;
          transition: 0.25s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(13,171,171,0.25);
          box-shadow: 0 20px 45px rgba(4,42,43,0.08);
        }

        .feature-number {
          position: absolute;
          right: 22px;
          top: 20px;
          color: rgba(4,42,43,0.055);
          font-size: 42px;
          font-weight: 900;
        }

        .feature-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${C.tealLight};
          color: ${C.teal};
          margin-bottom: 22px;
        }

        .feature-title {
          margin: 0 0 10px;
          font-size: 16px;
          font-weight: 850;
          color: ${C.dark};
        }

        .feature-description {
          margin: 0;
          color: ${C.muted};
          font-size: 13px;
          line-height: 1.75;
        }

        /* =====================================================
           HOW IT WORKS
        ===================================================== */

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .process-card {
          position: relative;
          min-height: 270px;
          padding: 27px;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 17px;
          background: rgba(255,255,255,0.045);
          transition: 0.25s ease;
        }

        .process-card:hover {
          background: rgba(255,255,255,0.075);
          transform: translateY(-4px);
        }

        .process-number {
          color: ${C.yellow};
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .process-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(246,232,121,0.11);
          color: ${C.yellow};
          margin: 25px 0 23px;
        }

        .process-title {
          margin: 0 0 10px;
          color: white;
          font-size: 16px;
          font-weight: 800;
        }

        .process-description {
          margin: 0;
          color: rgba(255,255,255,0.56);
          font-size: 13px;
          line-height: 1.75;
        }

        .process-arrow {
          position: absolute;
          top: 31px;
          right: -18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${C.darkMid};
          border: 1px solid rgba(255,255,255,0.10);
          color: rgba(255,255,255,0.45);
          z-index: 2;
        }

        /* =====================================================
           ROLES
        ===================================================== */

        .roles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .role-card {
          position: relative;
          padding: 40px;
          border-radius: 20px;
          overflow: hidden;
          transition: 0.25s ease;
        }

        .role-card:hover {
          transform: translateY(-4px);
        }

        .role-card.intern {
          background: white;
          border: 1px solid rgba(4,42,43,0.09);
          box-shadow: 0 16px 45px rgba(4,42,43,0.05);
        }

        .role-card.coordinator {
          background: ${C.dark};
          border: 1px solid ${C.dark};
        }

        .role-glow {
          position: absolute;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          right: -120px;
          top: -120px;
          background: rgba(13,171,171,0.08);
        }

        .coordinator .role-glow {
          background: rgba(246,232,121,0.07);
        }

        .role-icon {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          background: ${C.tealLight};
          color: ${C.teal};
        }

        .coordinator .role-icon {
          background: rgba(246,232,121,0.13);
          color: ${C.yellow};
        }

        .role-title {
          position: relative;
          margin: 0 0 12px;
          font-size: 23px;
          font-weight: 900;
          color: ${C.dark};
        }

        .coordinator .role-title {
          color: white;
        }

        .role-description {
          position: relative;
          margin: 0 0 26px;
          max-width: 500px;
          color: ${C.muted};
          font-size: 14px;
          line-height: 1.8;
        }

        .coordinator .role-description {
          color: rgba(255,255,255,0.63);
        }

        .role-list {
          position: relative;
          display: grid;
          gap: 11px;
          margin: 0 0 30px;
          padding: 0;
          list-style: none;
        }

        .role-list li {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #425f60;
          font-size: 13px;
          font-weight: 600;
        }

        .coordinator .role-list li {
          color: rgba(255,255,255,0.75);
        }

        .role-list svg {
          flex-shrink: 0;
          color: ${C.teal};
        }

        .coordinator .role-list svg {
          color: ${C.yellow};
        }

        .role-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 9px;
          border: none;
          font-size: 13px;
          font-weight: 800;
        }

        .intern .role-button {
          background: ${C.teal};
          color: white;
        }

        .coordinator .role-button {
          background: ${C.yellow};
          color: ${C.dark};
        }

        /* =====================================================
           TESTIMONIALS
        ===================================================== */

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .testimonial {
          padding: 28px;
          border-radius: 16px;
          background: #f6fafa;
          border: 1px solid rgba(4,42,43,0.07);
        }

        .stars {
          display: flex;
          gap: 3px;
          margin-bottom: 20px;
        }

        .testimonial-quote {
          margin: 0 0 25px;
          color: #3f5c5d;
          font-size: 14px;
          line-height: 1.8;
        }

        .person {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .person-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${C.teal};
          color: white;
          font-size: 11px;
          font-weight: 800;
        }

        .person-name {
          margin: 0;
          color: ${C.dark};
          font-size: 12px;
          font-weight: 800;
        }

        .person-role {
          margin: 3px 0 0;
          color: #819191;
          font-size: 10px;
        }

        /* =====================================================
           CTA
        ===================================================== */

        .cta-section {
          padding: 105px 0;
          background:
            radial-gradient(
              circle at 20% 30%,
              rgba(255,255,255,0.13),
              transparent 27%
            ),
            linear-gradient(
              135deg,
              ${C.teal},
              ${C.sky}
            );
        }

        .cta-box {
          text-align: center;
          max-width: 760px;
          margin: 0 auto;
        }

        .cta-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.13);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          font-size: 10px;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .cta-title {
          margin: 0;
          color: white;
          font-size: clamp(36px, 5vw, 54px);
          line-height: 1.05;
          letter-spacing: -2px;
          font-weight: 900;
        }

        .cta-description {
          max-width: 590px;
          margin: 20px auto 34px;
          color: rgba(255,255,255,0.82);
          font-size: 15px;
          line-height: 1.75;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cta-primary,
        .cta-secondary {
          min-height: 52px;
          padding: 0 24px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 850;
        }

        .cta-primary {
          color: ${C.teal};
          background: white;
          border: 1px solid white;
        }

        .cta-secondary {
          color: white;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.35);
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
          padding: 72px 0 30px;
          background: ${C.dark};
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 50px;
          padding-bottom: 50px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .footer-brand {
          max-width: 300px;
        }

        .footer-brand-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 17px;
        }

        .footer-logo {
          width: 37px;
          height: 37px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${C.teal};
          color: white;
        }

        .footer-brand-name {
          color: white;
          font-size: 18px;
          font-weight: 850;
        }

        .footer-description {
          margin: 0 0 20px;
          color: rgba(255,255,255,0.48);
          font-size: 12px;
          line-height: 1.8;
        }

        .footer-socials {
          display: flex;
          gap: 8px;
        }

        .footer-social {
          width: 35px;
          height: 35px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.55);
          transition: 0.2s ease;
        }

        .footer-social:hover {
          color: white;
          background: rgba(255,255,255,0.12);
        }

        .footer-heading {
          margin: 0 0 17px;
          color: rgba(255,255,255,0.38);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        .footer-link {
          display: block;
          margin-bottom: 11px;
          color: rgba(255,255,255,0.53);
          font-size: 12px;
          text-decoration: none;
          transition: 0.2s ease;
        }

        .footer-link:hover {
          color: ${C.yellow};
        }

        .demo-box {
          padding: 15px;
          border-radius: 10px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.09);
        }

        .demo-label {
          margin: 0 0 7px;
          color: rgba(255,255,255,0.38);
          font-size: 9px;
          font-weight: 800;
        }

        .demo-text {
          margin: 0 0 13px;
          color: rgba(255,255,255,0.52);
          font-size: 11px;
          line-height: 1.6;
        }

        .demo-button {
          width: 100%;
          padding: 9px;
          border: none;
          border-radius: 7px;
          background: ${C.teal};
          color: white;
          font-size: 11px;
          font-weight: 800;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-top: 25px;
        }

        .copyright {
          margin: 0;
          color: rgba(255,255,255,0.32);
          font-size: 10px;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1000px) {

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .hero-copy {
            max-width: 720px;
          }

          .hero-visual {
            max-width: 650px;
            width: 100%;
            margin: 0 auto;
          }

          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .testimonial-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .testimonial:last-child {
            grid-column: span 2;
          }

          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr;
          }

          .footer-demo {
            grid-column: span 3;
          }

        }

        @media (max-width: 760px) {

          .container {
            width: min(100% - 32px, 620px);
          }

          .navbar {
            height: 68px;
          }

          .nav-links,
          .nav-actions {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .mobile-menu {
            position: absolute;
            left: 16px;
            right: 16px;
            top: 76px;
            padding: 12px;
            border-radius: 14px;
            background: white;
            border: 1px solid rgba(4,42,43,0.08);
            box-shadow: 0 20px 50px rgba(4,42,43,0.14);
          }

          .mobile-menu.open {
            display: block;
          }

          .mobile-link {
            display: block;
            padding: 13px 12px;
            color: ${C.dark};
            text-decoration: none;
            font-size: 13px;
            font-weight: 700;
            border-radius: 8px;
          }

          .mobile-link:hover {
            background: ${C.tealLight};
            color: ${C.teal};
          }

          .mobile-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 8px;
            padding-top: 10px;
            border-top: 1px solid rgba(4,42,43,0.07);
          }

          .mobile-buttons button {
            padding: 11px 8px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 800;
          }

          .mobile-intern {
            border: 1px solid ${C.teal};
            background: white;
            color: ${C.teal};
          }

          .mobile-coordinator {
            border: 1px solid ${C.teal};
            background: ${C.teal};
            color: white;
          }

          .hero {
            padding: 72px 0 70px;
          }

          .hero-title {
            font-size: clamp(43px, 12vw, 58px);
            letter-spacing: -2.5px;
          }

          .hero-description {
            font-size: 15px;
          }

          .hero-visual {
            min-height: 370px;
          }

          .dashboard-window {
            inset: 20px 0 0;
          }

          .floating-card.one {
            left: -8px;
            bottom: 25px;
          }

          .floating-card.two {
            right: -5px;
            top: -4px;
          }

          .trust-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .trust-items {
            flex-wrap: wrap;
            gap: 15px 25px;
          }

          .section {
            padding: 78px 0;
          }

          .feature-grid,
          .process-grid,
          .testimonial-grid,
          .roles-grid {
            grid-template-columns: 1fr;
          }

          .testimonial:last-child {
            grid-column: auto;
          }

          .process-arrow {
            display: none;
          }

          .role-card {
            padding: 30px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 38px 25px;
          }

          .footer-brand {
            grid-column: span 2;
          }

          .footer-demo {
            grid-column: span 2;
          }

          .footer-bottom {
            flex-direction: column;
          }

        }

        @media (max-width: 480px) {

          .hero-actions {
            flex-direction: column;
          }

          .primary-cta,
          .secondary-cta {
            width: 100%;
          }

          .hero-visual {
            min-height: 325px;
          }

          .dashboard-body {
            padding: 14px;
          }

          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .dashboard-content .panel:last-child {
            display: none;
          }

          .metric-grid {
            gap: 6px;
          }

          .metric-card {
            padding: 9px;
          }

          .metric-value {
            font-size: 16px;
          }

          .floating-card {
            transform: scale(0.82);
          }

          .floating-card.one {
            left: -25px;
          }

          .floating-card.two {
            right: -25px;
          }

          .feature-card {
            min-height: auto;
          }

          .cta-actions {
            flex-direction: column;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
            justify-content: center;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-brand,
          .footer-demo {
            grid-column: auto;
          }

        }

        /* ==================== ABOUT SECTION ==================== */

.about-section {
  padding: 110px 6%;
  background: #fcfcfc;
  color: #042a2b;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Heading */

.about-heading {
  max-width: 760px;
  margin-bottom: 65px;
}

.section-label {
  display: inline-block;
  margin-bottom: 18px;
  color: #0dabab;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.about-heading h2 {
  margin: 0;
  font-size: clamp(38px, 5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 800;
}

.about-heading h2 span {
  color: #0dabab;
}

.about-heading > p {
  margin-top: 24px;
  max-width: 650px;
  color: #557071;
  font-size: 17px;
  line-height: 1.8;
}

/* Main content */

.about-content {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
}

/* Main card */

.about-main-card {
  min-height: 420px;
  padding: 42px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 28px;
  background: #042a2b;
  color: #fcfcfc;
  position: relative;
  overflow: hidden;
}

.about-main-card::after {
  content: "";
  position: absolute;
  width: 260px;
  height: 260px;
  right: -120px;
  bottom: -120px;
  border-radius: 50%;
  background: #0dabab;
  opacity: 0.15;
}

.about-card-number {
  font-size: 13px;
  font-weight: 800;
  color: #f6e879;
  letter-spacing: 0.12em;
}

.about-main-card h3 {
  margin: 0 0 18px;
  font-size: 30px;
  line-height: 1.2;
}

.about-main-card p {
  max-width: 620px;
  margin: 0 0 15px;
  color: rgba(252, 252, 252, 0.72);
  font-size: 15px;
  line-height: 1.8;
}

/* Side cards */

.about-side-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.about-small-card {
  flex: 1;
  padding: 26px 28px;
  display: flex;
  gap: 20px;
  border: 1px solid rgba(4, 42, 43, 0.09);
  border-radius: 20px;
  background: #ffffff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.about-small-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgba(4, 42, 43, 0.08);
}

.about-small-card > span {
  flex-shrink: 0;
  color: #0dabab;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.about-small-card h4 {
  margin: 0 0 8px;
  font-size: 17px;
  color: #042a2b;
}

.about-small-card p {
  margin: 0;
  color: #667879;
  font-size: 14px;
  line-height: 1.65;
}

/* Bottom information */

.about-bottom {
  margin-top: 24px;
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  border-radius: 22px;
  background: #f1f8f8;
  border: 1px solid rgba(13, 171, 171, 0.12);
}

.about-bottom strong {
  display: block;
  margin-bottom: 6px;
  color: #042a2b;
  font-size: 15px;
}

.about-bottom p {
  margin: 0;
  color: #637778;
  font-size: 14px;
}

.about-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.about-tags span {
  padding: 8px 12px;
  border-radius: 999px;
  background: #ffffff;
  color: #0d7f80;
  border: 1px solid rgba(13, 171, 171, 0.15);
  font-size: 12px;
  font-weight: 700;
}

/* Responsive */

@media (max-width: 900px) {
  .about-section {
    padding: 80px 5%;
  }

  .about-content {
    grid-template-columns: 1fr;
  }

  .about-main-card {
    min-height: auto;
  }

  .about-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .about-tags {
    justify-content: flex-start;
  }
}

@media (max-width: 600px) {
  .about-section {
    padding: 70px 20px;
  }

  .about-heading h2 {
    font-size: 38px;
  }

  .about-heading > p {
    font-size: 15px;
  }

  .about-main-card {
    padding: 30px 24px;
    border-radius: 22px;
  }

  .about-main-card h3 {
    font-size: 25px;
  }

  .about-small-card {
    padding: 22px;
  }

  .about-bottom {
    padding: 24px;
  }
}

      `}</style>


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar">

        <div className="container nav-inner">

          <a href="#home" className="brand">

            <div className="brand-icon">
              <BookOpen size={20} />
            </div>

            <div className="brand-name">
              Intern<span>Hub</span>
            </div>

          </a>


          <div className="nav-links">
            <a href="#about" className="nav-link">
              About
            </a>

            <a href="#features" className="nav-link">
              Features
            </a>

            <a href="#how" className="nav-link">
              How It Works
            </a>

            <a href="#roles" className="nav-link">
              Roles
            </a>

            <a href="#reviews" className="nav-link">
              Reviews
            </a>

          </div>


          <div className="nav-actions">

            <button
              className="nav-button outline"
              onClick={() => enter('intern')}
            >
              Intern Demo
            </button>

            <button
              className="nav-button primary"
              onClick={() => enter('coordinator')}
            >
              Coordinator Demo
            </button>

          </div>


          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>


        <div className={`mobile-menu ${mobileMenu ? 'open' : ''}`}>

          <a
            href="#features"
            className="mobile-link"
            onClick={closeMenu}
          >
            Features
          </a>

          <a
            href="#how"
            className="mobile-link"
            onClick={closeMenu}
          >
            How It Works
          </a>

          <a
            href="#roles"
            className="mobile-link"
            onClick={closeMenu}
          >
            Roles
          </a>

          <a
            href="#reviews"
            className="mobile-link"
            onClick={closeMenu}
          >
            Reviews
          </a>


          <div className="mobile-buttons">

            <button
              className="mobile-intern"
              onClick={() => {
                closeMenu();
                enter('intern');
              }}
            >
              Intern Demo
            </button>

            <button
              className="mobile-coordinator"
              onClick={() => {
                closeMenu();
                enter('coordinator');
              }}
            >
              Coordinator
            </button>

          </div>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero" id="home">

        <div className="container hero-grid">

          <div className="hero-copy">

            <div className="eyebrow">
              <span className="eyebrow-dot" />
              INTERNSHIP MANAGEMENT PLATFORM
            </div>


            <h1 className="hero-title">
              Run better
              <br />
              internships with
              <br />
              <span>clarity.</span>
            </h1>


            <p className="hero-description">
              InternHub brings tasks, submissions, progress,
              communication, achievements, and internship
              management together in one focused workspace.
            </p>


            <div className="hero-actions">

              <button
                className="primary-cta"
                onClick={() => enter('intern')}
              >
                <Users size={17} />
                Explore as Intern
                <ArrowRight size={15} />
              </button>


              <button
                className="secondary-cta"
                onClick={() => enter('coordinator')}
              >
                Explore as Coordinator
                <ArrowRight size={15} />
              </button>

            </div>


            <div className="hero-note">
              <CircleCheck size={15} />
              Interactive prototype · Sample data · No account required
            </div>

          </div>


          {/* PREMIUM DASHBOARD — NO ILLUSTRATION */}

          <div className="hero-visual">

            <div className="dashboard-window">

              <div className="window-top">

                <div className="window-dots">

                  <span className="window-dot" />
                  <span className="window-dot" />
                  <span className="window-dot" />

                </div>

                <div className="window-title">
                  InternHub / Dashboard
                </div>

                <div className="window-status">
                  <span className="status-dot" />
                  LIVE
                </div>

              </div>


              <div className="dashboard-body">

                <div className="dashboard-heading">

                  <div>

                    <h3>
                      Good morning, Alex
                    </h3>

                    <p>
                      Here is your internship overview.
                    </p>

                  </div>

                  <div className="dashboard-date">
                    THIS WEEK
                  </div>

                </div>


                <div className="metric-grid">

                  <div className="metric-card">

                    <div className="metric-icon">
                      <Target size={14} />
                    </div>

                    <div className="metric-value">
                      18
                    </div>

                    <div className="metric-label">
                      Tasks completed
                    </div>

                  </div>


                  <div className="metric-card">

                    <div className="metric-icon">
                      <Trophy size={14} />
                    </div>

                    <div className="metric-value">
                      740
                    </div>

                    <div className="metric-label">
                      Total points
                    </div>

                  </div>


                  <div className="metric-card">

                    <div className="metric-icon">
                      <TrendingUp size={14} />
                    </div>

                    <div className="metric-value">
                      +18%
                    </div>

                    <div className="metric-label">
                      Weekly growth
                    </div>

                  </div>

                </div>


                <div className="dashboard-content">

                  <div className="panel">

                    <div className="panel-header">

                      <strong>
                        Current tasks
                      </strong>

                      <span>
                        VIEW ALL
                      </span>

                    </div>


                    <div className="task-row">

                      <div className="task-check">
                        <CheckCircle size={12} />
                      </div>

                      <div className="task-info">
                        <strong>
                          Build landing page
                        </strong>
                        <span>
                          Due today
                        </span>
                      </div>

                      <div className="task-points">
                        +80
                      </div>

                    </div>


                    <div className="task-row">

                      <div className="task-check">
                        <CheckCircle size={12} />
                      </div>

                      <div className="task-info">
                        <strong>
                          Submit API project
                        </strong>
                        <span>
                          Due tomorrow
                        </span>
                      </div>

                      <div className="task-points">
                        +100
                      </div>

                    </div>


                    <div className="task-row">

                      <div className="task-check">
                        <CheckCircle size={12} />
                      </div>

                      <div className="task-info">
                        <strong>
                          Weekly reflection
                        </strong>
                        <span>
                          Due Friday
                        </span>
                      </div>

                      <div className="task-points">
                        +40
                      </div>

                    </div>

                  </div>


                  <div className="panel">

                    <div className="panel-header">

                      <strong>
                        Progress
                      </strong>

                      <span>
                        WEEKLY
                      </span>

                    </div>


                    <div className="progress-circle">

                      <div className="progress-number">
                        72%
                      </div>

                    </div>

                    <div className="progress-label">
                      Internship progress
                    </div>

                  </div>

                </div>

              </div>

            </div>


            <div className="floating-card one">

              <div className="floating-label">
                LATEST ACHIEVEMENT
              </div>

              <div className="floating-value">

                <div className="floating-icon">
                  <Award size={14} />
                </div>

                Task Master

              </div>

            </div>


            <div className="floating-card two">

              <div className="floating-label">
                TEAM ACTIVITY
              </div>

              <div className="floating-value">

                <div className="floating-icon">
                  <Users size={14} />
                </div>

                20+ interns

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TRUST STRIP
      ===================================================== */}

      <section className="trust-strip">

        <div className="container trust-inner">

          <span className="trust-label">
            Everything your internship workflow needs
          </span>

          <div className="trust-items">

            <div className="trust-item">
              <ClipboardCheck size={14} />
              Tasks
            </div>

            <div className="trust-item">
              <BarChart2 size={14} />
              Analytics
            </div>

            <div className="trust-item">
              <MessageSquare size={14} />
              Discussions
            </div>

            <div className="trust-item">
              <Award size={14} />
              Achievements
            </div>

            <div className="trust-item">
              <Shield size={14} />
              Coordination
            </div>

          </div>

        </div>

      </section>
      {/* ==================== ABOUT INTERNHUB ==================== */}
      <section className="about-section" id="about">
        <div className="about-container">

          <div className="about-heading">
            <span className="section-label">ABOUT INTERNHUB</span>

            <h2>
              A concept for a more
              <span> connected internship experience.</span>
            </h2>

            <p>
              InternHub is a demo-stage platform concept designed to show how
              internship programs can be managed through one connected digital
              workspace.
            </p>
          </div>

          <div className="about-content">

            <div className="about-main-card">
              <div className="about-card-number">01</div>

              <div>
                <h3>Built as a Platform Concept</h3>

                <p>
                  The idea behind InternHub is to bring the different parts of
                  internship management into one place — from assigning tasks
                  and receiving submissions to tracking progress and managing
                  intern performance.
                </p>

                <p>
                  Instead of relying on separate spreadsheets, messages,
                  documents and tools, InternHub demonstrates how these
                  workflows could work together in a single platform.
                </p>
              </div>
            </div>

            <div className="about-side-cards">

              <div className="about-small-card">
                <span>02</span>
                <div>
                  <h4>For Interns</h4>
                  <p>
                    Manage tasks, submissions, progress, achievements and
                    internship activities from one workspace.
                  </p>
                </div>
              </div>

              <div className="about-small-card">
                <span>03</span>
                <div>
                  <h4>For Coordinators</h4>
                  <p>
                    Organize interns, assign work, review submissions and
                    monitor overall progress.
                  </p>
                </div>
              </div>

              <div className="about-small-card">
                <span>04</span>
                <div>
                  <h4>Demo Stage</h4>
                  <p>
                    InternHub is currently presented as a working demonstration
                    and prototype, not as a finished production platform.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="about-bottom">
            <div>
              <strong>What this project demonstrates</strong>
              <p>
                A possible end-to-end digital workflow for modern internship
                management.
              </p>
            </div>

            <div className="about-tags">
              <span>Task Management</span>
              <span>Submissions</span>
              <span>Progress Tracking</span>
              <span>Communication</span>
              <span>Performance</span>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="section" id="features">

        <div className="container">

          <div className="section-header">

            <span className="section-label">
              Platform Features
            </span>

            <h2 className="section-title">
              One workspace.
              <br />
              Everything connected.
            </h2>

            <p className="section-description">
              A focused internship management experience
              designed to keep tasks, people, progress,
              and outcomes connected.
            </p>

          </div>


          <div className="feature-grid">

            {[
              {
                icon: <Target size={20} />,
                title: 'Task Management',
                desc: 'Create, assign, prioritize, and track internship tasks with deadlines, points, and clear ownership.',
              },
              {
                icon: <TrendingUp size={20} />,
                title: 'Progress Tracking',
                desc: 'Visualize completion rates, weekly activity, milestones, and overall internship progress.',
              },
              {
                icon: <CheckCircle size={20} />,
                title: 'Submission Review',
                desc: 'Submit work through descriptions or PR links and receive approval or revision feedback.',
              },
              {
                icon: <BarChart2 size={20} />,
                title: 'Leaderboard & Points',
                desc: 'Track performance through points and rankings while keeping the experience engaging.',
              },
              {
                icon: <MessageSquare size={20} />,
                title: 'Discussions & Polls',
                desc: 'Keep questions, discussions, announcements, and feedback inside the internship workspace.',
              },
              {
                icon: <Award size={20} />,
                title: 'Achievements',
                desc: 'Unlock milestones and monitor certificate readiness throughout the internship journey.',
              },
            ].map((feature, index) => (

              <div
                className="feature-card"
                key={feature.title}
              >

                <span className="feature-number">
                  0{index + 1}
                </span>

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3 className="feature-title">
                  {feature.title}
                </h3>

                <p className="feature-description">
                  {feature.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="section dark" id="how">

        <div className="container">

          <div className="section-header">

            <span className="section-label">
              Simple Process
            </span>

            <h2 className="section-title">
              From onboarding
              <br />
              to achievement.
            </h2>

            <p className="section-description">
              A simple workflow that gives interns a clear
              path and coordinators a central place to manage
              the entire program.
            </p>

          </div>


          <div className="process-grid">

            {[
              {
                number: '01',
                icon: <Users size={19} />,
                title: 'Join & Setup',
                desc: 'Coordinators create the workspace and interns receive access to their internship environment.',
              },
              {
                number: '02',
                icon: <Layers size={19} />,
                title: 'Work & Submit',
                desc: 'Interns complete assigned tasks, add work details, and submit their deliverables.',
              },
              {
                number: '03',
                icon: <ClipboardCheck size={19} />,
                title: 'Review & Earn',
                desc: 'Coordinators review submissions and award points after successful completion.',
              },
              {
                number: '04',
                icon: <Trophy size={19} />,
                title: 'Track & Achieve',
                desc: 'Monitor progress, unlock achievements, and work toward internship completion.',
              },
            ].map((step, index) => (

              <div
                className="process-card"
                key={step.number}
              >

                <div className="process-number">
                  {step.number}
                </div>

                <div className="process-icon">
                  {step.icon}
                </div>

                <h3 className="process-title">
                  {step.title}
                </h3>

                <p className="process-description">
                  {step.desc}
                </p>


                {index < 3 && (
                  <div className="process-arrow">
                    <ChevronRight size={15} />
                  </div>
                )}

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ROLES
      ===================================================== */}

      <section className="section soft" id="roles">

        <div className="container">

          <div className="section-header">

            <span className="section-label">
              Designed For Everyone
            </span>

            <h2 className="section-title">
              Two perspectives.
              <br />
              One workspace.
            </h2>

            <p className="section-description">
              InternHub gives each role the tools and
              information they need without unnecessary
              complexity.
            </p>

          </div>


          <div className="roles-grid">

            {/* INTERN */}

            <div className="role-card intern">

              <div className="role-glow" />

              <div className="role-icon">
                <BookOpen size={25} />
              </div>

              <h3 className="role-title">
                For Interns
              </h3>

              <p className="role-description">
                A personal workspace for managing tasks,
                deadlines, submissions, progress, and
                internship achievements.
              </p>


              <ul className="role-list">

                {[
                  'View and submit assigned tasks',
                  'Track points and leaderboard position',
                  'Participate in discussions and polls',
                  'Unlock achievement badges',
                  'Monitor certificate readiness',
                ].map((item) => (

                  <li key={item}>
                    <CheckCircle size={15} />
                    {item}
                  </li>

                ))}

              </ul>


              <button
                className="role-button"
                onClick={() => enter('intern')}
              >
                Try Intern View
                <ArrowRight size={15} />
              </button>

            </div>


            {/* COORDINATOR */}

            <div className="role-card coordinator">

              <div className="role-glow" />

              <div className="role-icon">
                <Shield size={25} />
              </div>

              <h3 className="role-title">
                For Coordinators
              </h3>

              <p className="role-description">
                A central command center for managing
                internship cohorts, reviewing work, tracking
                performance, and communicating with interns.
              </p>


              <ul className="role-list">

                {[
                  'Create and manage internship tasks',
                  'Review and approve submissions',
                  'Monitor cohort progress',
                  'Create announcements and polls',
                  'Track certificate eligibility',
                ].map((item) => (

                  <li key={item}>
                    <CheckCircle size={15} />
                    {item}
                  </li>

                ))}

              </ul>


              <button
                className="role-button"
                onClick={() => enter('coordinator')}
              >
                Try Coordinator View
                <ArrowRight size={15} />
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="section" id="reviews">

        <div className="container">

          <div className="section-header">

            <span className="section-label">
              What Interns Say
            </span>

            <h2 className="section-title">
              Built around the
              <br />
              internship experience.
            </h2>

          </div>


          <div className="testimonial-grid">

            {[
              {
                name: 'Alex Johnson',
                role: 'Frontend Intern',
                quote:
                  "Finally a platform where I know exactly what I need to do and how I'm tracking. The task board keeps everything clear.",
              },
              {
                name: 'Maria Garcia',
                role: 'UI/UX Intern',
                quote:
                  'Having submissions, discussions, announcements, and progress in one place makes the internship workflow much easier to follow.',
              },
              {
                name: 'James Smith',
                role: 'Backend Intern',
                quote:
                  'The achievement system makes progress visible and gives the internship experience a clear sense of milestones.',
              },
            ].map((testimonial) => (

              <div
                className="testimonial"
                key={testimonial.name}
              >

                <div className="stars">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <Star
                      key={star}
                      size={13}
                      fill={C.yellow}
                      color={C.yellow}
                    />

                  ))}

                </div>


                <p className="testimonial-quote">
                  "{testimonial.quote}"
                </p>


                <div className="person">

                  <div className="person-avatar">

                    {testimonial.name
                      .split(' ')
                      .map((name) => name[0])
                      .join('')}

                  </div>

                  <div>

                    <p className="person-name">
                      {testimonial.name}
                    </p>

                    <p className="person-role">
                      {testimonial.role}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="cta-section">

        <div className="container">

          <div className="cta-box">

            <div className="cta-label">
              <Sparkles size={13} />
              INTERACTIVE DEMO
            </div>


            <h2 className="cta-title">
              Ready to explore
              <br />
              InternHub?
            </h2>


            <p className="cta-description">
              Choose a role and explore the complete
              internship management experience. All demo
              changes are stored locally in your browser.
            </p>


            <div className="cta-actions">

              <button
                className="cta-primary"
                onClick={() => enter('intern')}
              >
                <Users size={17} />
                Enter as Intern
              </button>


              <button
                className="cta-secondary"
                onClick={() => enter('coordinator')}
              >
                Enter as Coordinator
                <ArrowRight size={17} />
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <div className="container">

          <div className="footer-grid">

            {/* BRAND */}

            <div className="footer-brand">

              <div className="footer-brand-row">

                <div className="footer-logo">
                  <BookOpen size={18} />
                </div>

                <span className="footer-brand-name">
                  InternHub
                </span>

              </div>


              <p className="footer-description">
                A concept prototype for managing internship
                programs. Tasks, progress, communication,
                and achievements in one workspace.
              </p>


              <div className="footer-socials">

                <div className="footer-social">
                  <Globe size={15} />
                </div>

                <div className="footer-social">
                  <ExternalLink size={15} />
                </div>

                <div className="footer-social">
                  <Mail size={15} />
                </div>

              </div>

            </div>


            {/* PRODUCT */}

            <div>

              <p className="footer-heading">
                Product
              </p>

              {[
                'Features',
                'How It Works',
                'Intern Dashboard',
                'Coordinator Dashboard',
                'Achievements',
              ].map((item) => (

                <a
                  href="#features"
                  className="footer-link"
                  key={item}
                >
                  {item}
                </a>

              ))}

            </div>


            {/* ABOUT */}

            <div>

              <p className="footer-heading">
                About
              </p>

              {[
                'About Us',
                'Our Mission',
                'Open Source',
                'Privacy Policy',
                'Terms of Use',
              ].map((item) => (

                <a
                  href="#home"
                  className="footer-link"
                  key={item}
                >
                  {item}
                </a>

              ))}

            </div>


            {/* DEMO */}

            <div className="footer-demo">

              <p className="footer-heading">
                Demo
              </p>


              <div className="demo-box">

                <p className="demo-label">
                  DEMO MODE
                </p>

                <p className="demo-text">
                  All data is fictional and persisted only
                  in your browser.
                </p>


                <button
                  className="demo-button"
                  onClick={() => enter('intern')}
                >
                  Launch Demo →
                </button>

              </div>

            </div>

          </div>


          <div className="footer-bottom">

            <p className="copyright">
              © 2026 InternHub. Concept prototype.
            </p>

            <p className="copyright">
              Built for a better internship experience.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}