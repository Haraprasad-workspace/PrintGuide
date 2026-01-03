import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  async function ensureUserDoc(user) {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        role: "student",
        createdAt: serverTimestamp(),
      });
    }
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await ensureUserDoc(result.user);
      navigate("/upload");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEmailAuth() {
    try {
      let userCredential;

      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      await ensureUserDoc(userCredential.user);
      navigate("/upload");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-8 text-white">
          {isSignup ? "Create Student Account" : "Student Login"}
        </h2>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-zinc-700 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors text-zinc-300 mb-6"
        >
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-1 border-zinc-800" />
          <span className="mx-4 text-xs text-zinc-600 font-medium">OR</span>
          <hr className="flex-1 border-zinc-800" />
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
        />

        {/* Email Auth Button */}
        <button
          onClick={handleEmailAuth}
          className="w-full bg-white text-zinc-950 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
        >
          {isSignup ? "Create Account" : "Login with Email"}
        </button>

        {/* Toggle Signup/Login */}
        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-sm text-center text-zinc-500 mt-6 cursor-pointer hover:text-zinc-300 transition-colors"
        >
          {isSignup
            ? "Already have an account? Login"
            : "New user? Create account"}
        </p>
      </div>
    </main>
  );
}

export default Login;
