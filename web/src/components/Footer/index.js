import './footer.css';

const site = 'Petshop';

export default function Footer() {
  return (
    <div className='mt-5'>
      <footer className="shadow-lg bg-light fixed-bottom">
        <div className="p-2">
          <p className="text-center text-muted"> {site}</p>
        </div>
      </footer>
    </div>
  );
}