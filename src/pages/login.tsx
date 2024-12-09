import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as z from "zod"
import { CheckAuth } from "../../firebase"
import { useNavigate } from "react-router-dom"

const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Please enter a valid user name.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters long.",
  }),
})

type LoginFormValues = z.infer<typeof loginSchema>


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })


  const goToIslandPage = () => {
    navigate('/island');
  }
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(null); // Reset error message
    try {
      const isAuthenticated = await CheckAuth(data.username, data.password);
      if (isAuthenticated) {
        goToIslandPage();
      } else {
        setErrorMessage("User or password don't match."); // Set error message
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div> // Display error message
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label >User Name</Label>
                <Input
                  id="username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <CardFooter className="px-0 pt-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
