export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/discover/popular',
      permanent: false,
    },
  };
}

export default function Home() {
  return {};
}
