export async function getServerSideConfig() {
  return {
    googleAuthEnabled: process.env.GOOGLE_AUTH_ENABLED === 'true',
    githubAuthEnabled: process.env.GITHUB_AUTH_ENABLED === 'true',
  }
}
