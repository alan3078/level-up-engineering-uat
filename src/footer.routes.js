// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
// import logoCT from "assets/images/logo-ct-dark.png";
import bgLogo from "assets/images/bg-logo.jpeg";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "豐進工程有限公司",
    image: bgLogo,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/LEVEL.UP.ENGINEERING.CO.LTD/",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/channel/UC1zGtWKFgUilDPKKTTLuwDg",
    },
    {
      icon: <EmailIcon />,
      link: "mailto:lvup.decor@gmail.com",
    },
  ],
  menus: [
    {
      name: "公司資料",
      items: [
        { name: "關於我們", href: "https://www.creative-tim.com/presentation" },
        { name: "公司聲明", href: "https://www.creative-tim.com/templates/free" },
      ],
    },
    // {
    //   name: "resources",
    //   items: [
    //     { name: "illustrations", href: "https://iradesign.io/" },
    //     { name: "bits & snippets", href: "https://www.creative-tim.com/bits" },
    //     { name: "affiliate program", href: "https://www.creative-tim.com/affiliates/new" },
    //   ],
    // },
    // {
    //   name: "help & support",
    //   items: [
    //     { name: "contact us", href: "https://www.creative-tim.com/contact-us" },
    //     { name: "knowledge center", href: "https://www.creative-tim.com/knowledge-center" },
    //     { name: "custom development", href: "https://services.creative-tim.com/" },
    //     { name: "sponsorships", href: "https://www.creative-tim.com/sponsorships" },
    //   ],
    // },
    // {
    //   name: "legal",
    //   items: [
    //     { name: "terms & conditions", href: "https://www.creative-tim.com/terms" },
    //     { name: "privacy policy", href: "https://www.creative-tim.com/privacy" },
    //     { name: "licenses (EULA)", href: "https://www.creative-tim.com/license" },
    //   ],
    // },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Material Kit by{" "}
      <MKTypography
        component="a"
        href="https://www.creative-tim.com"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Creative Tim
      </MKTypography>
      .
    </MKTypography>
  ),
};
