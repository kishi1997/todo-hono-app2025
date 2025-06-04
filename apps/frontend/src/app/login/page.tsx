import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col space-y-4 min-w-3xl">
        <label htmlFor="email" className="font-semibold">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border border-gray-300 p-2 rounded"
        />
        <label htmlFor="password" className="font-semibold">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          formAction={login}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Log in
        </button>
        <button
          type="submit"
          formAction={signup}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
