import { useState, useContext } from "react";
import { Input, Textarea, Button } from "@heroui/react";
import { NoteficationContext } from "@/context/NoteficationContext";

export const Contact = () => {
  const notificationCtx = useContext(NoteficationContext);

  if (!notificationCtx) {
    throw new Error("Contact must be used inside NotificationProvider");
  }

  const { addNotefication } = notificationCtx;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

        alert("Your message has been sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-4 pt-0">
      <h1 className="flex justify-center text-6xl font-bold mb-6 bg-gradient-to-l from-[#00F5A0] to-[#00D9F5] bg-clip-text text-transparent">
        Contact Me
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          label="Name"
          value={form.name}
          onChange={(input) => handleChange("name", input.target.value)}
          variant="bordered"
          fullWidth
          name="name"
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(input) => handleChange("email", input.target.value)}
          variant="bordered"
          fullWidth
          name="email"
          required
        />
        <Textarea
          label="Message"
          value={form.message}
          onChange={(input) => handleChange("message", input.target.value)}
          variant="bordered"
          fullWidth
          minRows={4}
          name="message"
          required
        />
        <Button type="submit" className="w-full bg-blue-600 text-white">
          Send Message
        </Button>
      </form>
    </div>
  );
};
