'use client';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Loading from '../(components)/Loading';
import ErrorMessage from '../(components)/ErrorMessage';

const Profile = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <a href="/api/auth/logout">Logout</a>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        <ul>
        {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]} </li>)}
        </ul>
      </div>
    )
  );
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <Loading />,
    onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});