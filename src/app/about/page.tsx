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

      <section id="marketlead-info" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-primary font-headline uppercase tracking-widest">
              SHYAM FURNITURE IS A PREMIUM FURNITURE RETAILER SPECIALIZING IN HANDCRAFTED, HIGH-QUALITY PRODUCTS.
            </h2>
            <div className="text-center text-muted-foreground">
              <p>Shyam Furniture serves customers in the Saharsa region with a wide range of stylish and durable furniture for homes and offices, blending traditional craftsmanship with contemporary design. With a strong local presence built over decades, we have evolved into a modern retail brand, offering a seamless online shopping experience through our website and mobile application. Committed to quality, timely delivery, and customer satisfaction, we have earned the trust of thousands of families. Our operations are managed by a team of experienced professionals, each playing a vital role in driving our growth and ensuring excellence at every step.</p>
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