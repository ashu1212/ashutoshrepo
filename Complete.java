package Equals;

public class Complete {
	
	public static void main(String args[])
	{
		Equalss eq = new Equalss();
		Thread t1 = new Thread(new Runnable(){
			
			public void run()
			{
				try {
					System.out.println("Hey");
					eq.producer();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
		
		
Thread t2 = new Thread(new Runnable(){
			
			public void run()
			{
				try {
					eq.consumer();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
	t1.start();
	t2.start();
	try {
		t1.join();
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
	try {
		t2.join();
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
	}

}

 class Equalss
{
	 boolean runner = true;
	 
	 public void producer() throws InterruptedException
	 {
		 synchronized(this){
				System.out.println("before wait:");
				wait();
				System.out.println("after the wait:");
				}
	 }
	 
	 public void consumer() throws InterruptedException
	 {
			int cout=0;
			synchronized(this){          
				System.out.println("signal received by wait:");
				notify();
				while(runner){
				Thread.sleep(1000);
				System.out.print("=");
				cout++;
				if(cout==60){
					break;
				}
				Thread.interrupted();
				  }
				System.out.println("thread terminated");

				}
	 }
}
					
