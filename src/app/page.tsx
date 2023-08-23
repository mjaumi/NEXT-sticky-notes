import Notes from '@/components/Notes/Notes';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function HomePage() {

  // rendering the home page here
  return (
    <main className='flex min-h-screen'>
      <Sidebar/>
      <Notes/>
    </main>
  )
}
