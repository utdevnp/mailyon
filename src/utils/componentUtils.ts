import { ComponentType } from "../types";

export const getDefaultProps = (type: ComponentType): Record<string, any> => {
  switch (type) {
    case "header":
      return {
        logo: "",
        logoWidth: "200px",
        logoHeight: "60px",
        title: "Company Name",
        subtitle: "Your tagline here",
        backgroundColor: "transparent",
        textColor: "#000000",
        logoVisible: true,
        titleVisible: true,
        subtitleVisible: true,
        padding: "5px",
      };
    case "text":
      return {
        content:
          "Welcome to templify! This is a sample text block where you can add your content. You can customize the font size, weight, alignment, and colors to match your brand.",
        fontSize: "16px",
        fontWeight: "normal",
        textAlign: "left",
        color: "#000000",
        lineHeight: "1.5",
        backgroundColor: "transparent",
        textVisible: true,
        padding: "5px",
      };
    case "image":
      return {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop&crop=center",
        alt: "Professional business image - perfect for your email content",
        width: "600px",
        height: "300px",
        align: "center",
        borderRadius: "0px",
        imageVisible: true,
        padding: "5px",
      };
    case "button":
      return {
        text: "Click Here",
        url: "#",
        backgroundColor: "#3b82f6",
        textColor: "#ffffff",
        borderRadius: "6px",
        padding: "12px 24px",
        canvasPadding: "5px",
        fontSize: "16px",
        buttonVisible: true,
      };
    case "divider":
      return {
        color: "#e5e7eb",
        height: "1px",
        margin: "2px 2px",
        padding: "5px",
      };

    case "footer":
      return {
        companyName: "Company Name",
        address: "123 Main St, City, State 12345",
        phone: "+1 (555) 123-4567",
        email: "info@company.com",
        socialLinks: [
          {
            title: "Facebook",
            imageUrl:
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/facebook.svg",
            url: "#",
          },
          {
            title: "Twitter",
            imageUrl:
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/twitter.svg",
            url: "#",
          },
          {
            title: "LinkedIn",
            imageUrl:
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/linkedin.svg",
            url: "#",
          },
        ],
        unsubscribeText: "Click here to unsubscribe",
        unsubscribeUrl: "https://company.com/unsubscribe",
        backgroundColor: "transparent",
        companyNameColor: "#111827",
        contactTextColor: "#6b7280",
        socialTextColor: "#6b7280",
        unsubscribeTextColor: "#9ca3af",
        padding: "5px",
        contentAlignment: "center",
      };
    case "spacer":
      return {
        height: "20px",
        padding: "5px",
      };
    case "socialMedia":
      return {
        platforms: [
          {
            platform: "Facebook",
            title: "Facebook",
            imageUrl:
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/facebook.svg",
            url: "#",
          },
          {
            platform: "Twitter",
            title: "Twitter",
            imageUrl:
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/twitter.svg",
            url: "#",
          },
          {
            platform: "Instagram",
            title: "Instagram",
            imageUrl:
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/instagram.svg",
            url: "#",
          },
        ],
        alignment: "horizontal",
        type: "icon",
        spacing: "16px",
        iconSize: "24px",
        backgroundColor: "transparent",
        padding: "5px",
      };
    case "columns":
      return {
        columns: 2,
        padding: "5px",
        backgroundColor: "transparent",
      };
    case "column":
      return {
        width: "50%",
        padding: "5px",
        backgroundColor: "transparent",
        verticalAlign: "top",
      };
    default:
      return {};
  }
};
