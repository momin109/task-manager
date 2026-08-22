import type { ReactNode } from "react";
import { CheckCircle2, ListTodo } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const features = [
  "Track every task in one place",
  "Filter by status in a click",
  "Dark mode, built in",
];

const AuthLayout = ({ title, subtitle, children, footer }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f8f9fc] lg:grid lg:grid-cols-2">
      {/* Left Section */}
      <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-[#5b55d6] via-[#4f49c4] to-[#37338f] lg:flex lg:flex-col lg:p-16">
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.7) 1.5px, transparent 1.5px)",
            backgroundSize: "38px 38px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <ListTodo className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
        </div>

        {/* Main Content */}
        <div className="relative z-10 my-auto">
          <h2 className="max-w-lg text-4xl font-bold leading-tight text-white">
            Stay on top of every task,
            <br />
            every day.
          </h2>

          {/* Features */}
          <div className="mt-8 space-y-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-base text-white/85 lg:text-lg"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <p className="relative z-10 text-base text-white/65">
          Built with the MERN stack
        </p>
      </section>

      {/* Right Section */}
      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-xl">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">
              {title}
            </h2>

            <p className="mt-2 text-base text-slate-500">{subtitle}</p>
          </div>

          {/* Form Card */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-base text-slate-500">
            {footer}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
