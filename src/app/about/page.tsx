import Image from 'next/image';

const teamMembers = [
    { name: "John Doe", role: "Founder & CEO", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Jane Smith", role: "Lead Designer", image: "https://images.pexels.com/photos/2811089/pexels-photo-2811089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Sam Wilson", role: "Operations Head", image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Matthew Foster", role: "Chief Sales Officer", image: "https://images.pexels.com/photos/2216607/pexels-photo-2216607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Artur Dichter", role: "Chief Financial Officer", image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Oliver Rohlsson", role: "Chief Technical Officer", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
];


export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header 
        className="relative w-full min-h-[25em] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop')"}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 w-11/12 md:w-3/4 lg:w-1/2 mt-20 text-foreground">
          <span className="inline-block uppercase tracking-wider text-sm font-semibold">Company Management</span>
          <h1 className="text-2xl md:text-4xl font-bold mt-2">Meet a team of experts and innovators who are pioneers in their field</h1>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 -mt-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-8 rounded-lg bg-card border border-border/50 text-center flex flex-col items-center shadow-lg transition-transform hover:scale-105">
               <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold font-headline mt-4">{member.name}</h2>
              <p className="text-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
