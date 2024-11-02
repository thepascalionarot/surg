import { exec } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'

const execAsync = promisify(exec)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Install surge if not already installed
    await execAsync('npm install -g surge')

    // Generate token using surge CLI
    const { stdout } = await execAsync(`echo "${password}" | surge token ${email}`)

    // Extract token from output
    const token = stdout.trim()

    return NextResponse.json({ token })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to generate token' },
      { status: 500 }
    )
  }
}