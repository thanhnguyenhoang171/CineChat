import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_-20%,var(--color-secondary),transparent)]" />
      </div>

      {/* Navbar Placeholder */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <div className="text-4xl font-black text-primary tracking-tighter">
          CINECHAT
        </div>
        <Link href="/login">
          <Button variant="outline" size="sm" className="px-6 font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 text-center text-foreground md:pt-48">
        <h1 className="text-4xl font-black md:text-6xl lg:text-7xl max-w-4xl leading-tight text-primary">
          Unlimited movies, TV shows, and more.
        </h1>
        <p className="mt-6 text-xl md:text-2xl font-medium text-muted-foreground">
          Watch anywhere. Cancel anytime.
        </p>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground/80">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        
        <div className="mt-10 flex w-full max-w-2xl flex-col gap-3 px-4 md:flex-row md:gap-0">
          <Input
            type="email"
            placeholder="Email address"
            className="h-16 w-full border-border bg-card px-6 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring md:rounded-r-none text-lg"
          />
          <Link href="/register" className="w-full md:w-auto">
            <Button variant="default" size="xl" className="h-16 w-full whitespace-nowrap md:rounded-l-none text-xl font-bold px-10 shadow-lg hover:shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}