export const ROLE = {
  STAFF: "STAFF",
  PATIENT: "PATIENT",
};

export const STAFF_SIDEBAR = [
  { content: "Home", route: "/" },
  { content: "Record History", route: "/record" },
  { content: "Contact", route: "/contact" },
  // { content: 'Chat', route: '/chat' },
];

export const PATIENT_SIDEBAR = [
  { content: "Home", route: "/" },
  { content: "Prognosis", route: "/prognosis" },
  { content: "Record History", route: "/record" },
  { content: "Contact", route: "/contact" },
  // { content: "Report", route: "/report" },
];
