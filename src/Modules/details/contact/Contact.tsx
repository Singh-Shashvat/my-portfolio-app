import { useState, useContext } from "react";
import { Input, Textarea, Button } from "@heroui/react";

import { NoteficationContext } from "@/context/notificationcontext/NoteficationContext";

interface IContactForm {
  name: string;
  email: string;
  message: string;
}

export const Contact = () => {
  const notificationCtx = useContext(NoteficationContext);

  if (!notificationCtx) {
    throw new Error("Contact must be used inside NotificationProvider");
  }

  const { addNotefication } = notificationCtx;

  const [form, setForm] = useState<IContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (field: keyof IContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xkgvrgnv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        addNotefication({ name: form.name, message: form.message });
        alert("Your message has been sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-10 sm:py-16">
      <div className="w-full max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] bg-clip-text text-transparent">
            Contact Me
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </div>

        <form
          className="p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 shadow-2xl shadow-black/50 backdrop-blur-md space-y-5"
          onSubmit={handleSubmit}
        >
          <Input
            fullWidth
            required
            classNames={{
              input: "text-white text-sm",
              inputWrapper:
                "border-neutral-700/80 hover:border-cyan-500 focus-within:!border-cyan-500 bg-neutral-950/40",
              label: "text-neutral-400 text-sm font-medium",
            }}
            label="Name"
            name="name"
            placeholder="Your name"
            value={form.name}
            variant="bordered"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Input
            fullWidth
            required
            classNames={{
              input: "text-white text-sm",
              inputWrapper:
                "border-neutral-700/80 hover:border-cyan-500 focus-within:!border-cyan-500 bg-neutral-950/40",
              label: "text-neutral-400 text-sm font-medium",
            }}
            label="Email"
            name="email"
            placeholder="you@example.com"
            type="email"
            value={form.email}
            variant="bordered"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <Textarea
            fullWidth
            required
            classNames={{
              input: "text-white text-sm",
              inputWrapper:
                "border-neutral-700/80 hover:border-cyan-500 focus-within:!border-cyan-500 bg-neutral-950/40",
              label: "text-neutral-400 text-sm font-medium",
            }}
            label="Message"
            minRows={4}
            name="message"
            placeholder="Write your message here..."
            value={form.message}
            variant="bordered"
            onChange={(e) => handleChange("message", e.target.value)}
          />

          <Button
            className="w-full min-h-[48px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-base rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99]"
            isLoading={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};
