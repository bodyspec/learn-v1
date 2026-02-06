import type { Meta, StoryObj } from '@storybook/react-vite'
import SignInPrompt from './SignInPrompt'

/**
 * SignInPrompt uses useAuth() from @/auth/AuthProvider.
 * We mock the module so the component gets a no-op login function.
 */
const meta: Meta<typeof SignInPrompt> = {
  title: 'Common/SignInPrompt',
  component: SignInPrompt,
  argTypes: {
    message: { control: 'text' },
    compact: { control: 'boolean' },
  },
  // Mock the auth module
  beforeEach: () => {
    // The mock is set up at the module level via parameters
  },
}

export default meta
type Story = StoryObj<typeof SignInPrompt>

export const Default: Story = {}

export const CustomMessage: Story = {
  args: {
    message: 'Create an account to earn your DEXA certification.',
  },
}

export const Compact: Story = {
  args: {
    compact: true,
  },
}

export const CompactCustomMessage: Story = {
  args: {
    compact: true,
    message: 'Sign in for certificates',
  },
}
