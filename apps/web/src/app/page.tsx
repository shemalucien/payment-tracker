
import SignIn from "./auth/signin/page";
export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
        <SignIn />
    </main>
  );
}
