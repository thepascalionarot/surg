'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function SurgeTokenGenerator() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const generateToken = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/surge-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to generate token')
      
      setToken(data.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generate Surge Token</CardTitle>
        <CardDescription>Enter your Surge credentials to generate a token</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {token && (
          <Alert>
            <AlertDescription className="font-mono break-all">{token}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={generateToken} 
          disabled={loading || !email || !password}
        >
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Generate Token
        </Button>
      </CardFooter>
    </Card>
  )
}
