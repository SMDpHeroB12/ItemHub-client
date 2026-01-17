import HowItWorksClient from "./HowItWorksClient";

export default function HowItWorks() {
  const steps = [
    {
      title: "Browse Public Items",
      desc: "Anyone can view items without logging in.",
    },
    {
      title: "Login Securely",
      desc: "Use demo credentials or Google login via NextAuth.",
    },
    {
      title: "Add New Items",
      desc: "Only authenticated users can add items to the database.",
    },
  ];

  return <HowItWorksClient steps={steps} />;
}
