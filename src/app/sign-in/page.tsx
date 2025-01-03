import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";

const SignInPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Sign In"
        description="Sign in to access the product management system"
        className="animate-fade-from-top w-full max-w-[420px]"
        content={<SignInForm />}
      />
    </div>
  );
};

export default SignInPage;
