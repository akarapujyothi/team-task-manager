import { useState } from "react";

const API = "https://team-task-manager-pvda.onrender.com/";

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    try {
      const url = isLogin ? "/auth/login" : "/auth/signup";

      const res = await fetch(API + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }


      if (isLogin) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } 
 
      else {
        alert("Signup successful! Please login.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }

    } catch (error) {
      console.log(error);
      alert("Backend not reachable ");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>

        {!isLogin && (
          <input
            placeholder="Name"
            className="w-full p-2 border mb-2"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Email"
          className="w-full p-2 border mb-2"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />


        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-2"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

   
        <button
          onClick={submit}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLogin ? "Login" : "Signup"}
        </button>


        <p className="text-sm mt-3 text-center">
          <button
            className="text-blue-500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Create account"
              : "Already have account?"}
          </button>
        </p>
      </div>
    </div>
  );
}