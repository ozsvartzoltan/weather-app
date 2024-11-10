export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/ozsvartzoltan",
    discord: "https://discord.com/users/420143790670610433",
    linkedin: "https://www.linkedin.com/in/zoltan-florian-ozsvart-1586681aa/",
    weatherapi: "https://www.weatherapi.com/",
  },
  API_key: "6da08b5b980045bfadb121929240711",
};

export const daysOfWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export function convertToMilitaryTime(timestr: string) {
  let [time, ampm] = timestr.split(" ");
  let [hour, min] = time.split(":");
  ampm == "PM"
    ? (hour = String(parseInt(hour) + 12))
    : (hour = String(parseInt(hour)));
  return `${hour}:${min}`;
}
