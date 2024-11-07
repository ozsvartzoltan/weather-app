import Link from "next/link";
import {
  GithubIcon,
  DiscordIcon,
  LinkedInIcon,
  SearchIcon,
  WeatherIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Divider } from "@nextui-org/divider";

export default function Footer() {
  return (
    <div>
      <div className="w-full flex items-center justify-center sm:flex gap-3">
        <Link aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <Link aria-label="Discord" href={siteConfig.links.discord}>
          <DiscordIcon className="text-default-500" />
        </Link>
        <Link aria-label="Linkedin" href={siteConfig.links.linkedin}>
          <LinkedInIcon className="text-default-500" />
        </Link>
      </div>
      <Divider className="my-4 w-2/3 mx-auto" />
      <div className="w-full flex justify-center my-4">
        <Link href={siteConfig.links.weatherapi}>Weather API</Link>
      </div>
    </div>
  );
}
