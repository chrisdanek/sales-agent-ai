import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to access the product management system"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<SignInForm />}
      />
    </div>
  );
};

export default SignInPage;
