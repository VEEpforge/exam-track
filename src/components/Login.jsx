import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

const Login = () => {

	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [attempts, setAttempts] = useState(0);

	const navigate = useNavigate();

	const handleLogin = async () => {
		const result = userSchema.safeParse({ email, password });

		if (!result.success) {
      // Map field-specific errors
      const errors = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      setError("");
      return;
    }

    // Clear specific errors
    setFieldErrors({});

    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      if (response.data.length > 0) {
        // Successful login
        localStorage.setItem("loggedIn", "true");
        const user = response.data[0]; // Retrieve user details
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        // Invalid credentials && Maximum attempt
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
          setError("Maximum limit of login attempts reached. Try again later.");
        } else {
          setError("Incorrect email or password.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Error. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card className="w-full m-2 md:m-0 max-w-sm">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl font-bold text-primary">Exam Track</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="m@example.com"
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: "" })); // Clear email error
                  setError("");
                }}
                required
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm">{fieldErrors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                // onChange={(e) => setPassword(e.target.value)}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: "" })); // Clear password error
                  setError("");
                }}
              />
              {fieldErrors.password && (
                <p className="text-red-500 text-sm">{fieldErrors.password}</p>
              )}
            </div>
          </form>
          
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button
            className={`w-full p-2 rounded ${
              password.length < 4 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleLogin}
            disabled={password.length < 4 || attempts >= 3}
          >
            Login
          </Button>
          <a href='#' className='text-sm text-gray-500 hover:underline'>Forgot password?</a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login