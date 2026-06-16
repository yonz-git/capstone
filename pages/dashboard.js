import ZodiacSign from "../components/Zodiac/ZodiacSign";

export default function Dashboard({ userProfile }) {
  // Assuming userProfile looks something like: { name: "Yeon Ji", sunSign: "Leo" }

  return (
    <main>
      <h1>Welcome, Starseed!</h1>

      {/* Feed the layout state data straight down */}
      <ZodiacSign sunSign={userProfile?.sunSign} />
    </main>
  );
}
