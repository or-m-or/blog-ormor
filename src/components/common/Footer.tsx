export default function Footer() {
  return (
    <footer className='bg-background/50 text-foreground p-4 backdrop-blur-md'>
      <div className='container mx-auto'>
        <div className='text-center'>
          <p className='text-sm'>
            Copyright © {new Date().getFullYear()} - All right reserved by or.m.or
          </p>
        </div>
      </div>
    </footer>
  );
}
