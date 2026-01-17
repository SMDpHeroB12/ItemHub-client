import TestimonialsClient from "./TestimonialsClient";

export default function Testimonials() {
  const list = [
    {
      name: "Recruiter",
      role: "Frontend Engineer",
      text: "Clean layout, good structure, easy to navigate.",
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Mentor",
      role: "Full Stack Developer",
      text: "Nice separation of client/server with real API usage.",
      image: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "User",
      role: "Visitor",
      text: "Fast and simple. Dark mode works great.",
      image: "https://i.pravatar.cc/100?img=45",
    },
  ];

  return <TestimonialsClient list={list} />;
}
