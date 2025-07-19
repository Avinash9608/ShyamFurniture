import Image from 'next/image';

const teamMembers = [
    { name: "Mr. Gupta", role: "Head of Operations", image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Mr. Sahil Gupta", role: "CEO & Managing Director", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Mr. Gupta", role: "Head of Technical & Logistics", image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const historyData = [
  { year: "1990s", description: "Shyam Furniture founded in the early 1990s" },
  { year: "2020s", description: "Expansion into modern and custom furniture design in the 2020s" },
  { year: "2023", description: "Online ordering introduced via WhatsApp and Email in 2023" },
  { year: "2025", description: "Official website and mobile-friendly catalog launched in 2025" },
  { year: "Early 2025", description: "Formation of in-house technical and logistics team in early 2025" },
  { year: "Mid-2025", description: "Dedicated delivery service established within Saharsa in mid-2025" },
  { year: "Upcoming Year", description: "Planned expansion of delivery to nearby cities in the upcoming year" },
]

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen about-page-new">

      <section id="marketlead-info" className="py-16 md:py-24" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D')" }}>
        <div className="max-w-6xl mx-auto px-4">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground font-headline uppercase tracking-wider">
                A premium furniture retailer specializing in handcrafted, high-quality products.
                </h2>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
                    <Image src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/23220f28-0c9e-4c94-973a-e1b598918b74.png" alt="High-quality furniture" layout="fill" objectFit="cover" data-ai-hint="furniture store interior" />
                </div>
            </div>
          </div>
      </section>
        
      <section id="timeline">
        <h2 className="text-center text-primary font-bold text-3xl md:text-4xl uppercase tracking-widest mb-16">HISTORY</h2>
        <div className="timeline-container">
          {historyData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-item-content">
                  <span className="timeline-year">{item.year}</span>
                  <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

       <section className="team py-16">
          <h2 className="section-heading">Our Team</h2>
          <div className="container">
            {teamMembers.map((member, index) => (
              <div key={index} className="profile">
                <Image
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  width={200}
                  height={200}
                  className="profile-img"
                />
                <div className="name-container">
                  <span className="name">{member.name}</span>
                  <span className="role">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}
