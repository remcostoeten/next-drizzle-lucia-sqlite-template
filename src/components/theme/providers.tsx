import { TooltipProvider } from "@/components/ui";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../../app/theme-provider";

export default function Providers({ children }: PageProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange children={undefined}    >
      <TooltipProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#040404",
              color: "#ffffff",
              border: "1px solid white",
              borderRadius: "8px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            },
            success: {
              icon: <CheckIcon className="w-5 h-5 text-success" />,
            },
            error: {
              icon: <ExclamationTriangleIcon className="w-5 h-5 text-error" />,
            },
          }}
        />
      </TooltipProvider>
    </ThemeProvider>
  );
}
