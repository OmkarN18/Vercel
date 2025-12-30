import { useState } from "react";
import { CustomerRegistrationForm } from "@/components/CustomerRegistrationForm";
import { CustomerList } from "@/components/CustomerList";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCustomerAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Customer Registration
          </h1>
          <p className="text-muted-foreground">
            Simple proof of concept for customer data management
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <CustomerRegistrationForm onSuccess={handleCustomerAdded} />
          <CustomerList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default Index;
