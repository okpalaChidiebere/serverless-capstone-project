export function getToken(authHeader: string): string {

  if (!authHeader) {
    throw new Error('No authentication header')
  }
  
  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    throw new Error('Invalid authentication header')
  }
  
  const split = authHeader.split(' ')

  if(split.length != 2){ //if our token is not in the format we expect. eg having more than one spaces or just one string with no spaces
    throw new Error('Malformed token.')
  }
    
  const token = split[1]
  
  return token
}