---
title: Computer Algorithms Union Find (ตอนที่ 1)
date: 2016-08-02T03:00:03
description: ในบทความเกี่ยวกับ Union Find นี้จะใช้ C# ในการแสดงผลลัพธ์ โดยในตอนนี้เราจะใช้สร้าง Method Union / Connected? โดยใช้ Class connection ช่วยในการจัดเก็บการเชื่อมต่อ ซึ่งง่ายและสะดวกดี เพราะ มันสามารถ เก็
---

ในบทความเกี่ยวกับ Union Find นี้จะใช้ C# ในการแสดงผลลัพธ์ โดยในตอนนี้เราจะใช้สร้าง Method Union / Connected? โดยใช้ Class connection ช่วยในการจัดเก็บการเชื่อมต่อ ซึ่งง่ายและสะดวกดี เพราะ มันสามารถ เก็บ Object ที่เราต้องการได้ เริ่มด้วยการสร้างสร้าง Class UF และ connection ตามนี้นะครับ

 
<pre class="lang:c# decode:true " >
    public class connection{
        public int ID;
        public connection linkto;
    }

    public class UF
    {
        public List<connection> data;
        public UF(int N)
        {
            data = new List<connection>();
            for (int i = 0; i < N; i++)
            {                
                connection con = new connection();
                con.ID = i;
                data.Add(con);
            }
        }
        public void union(int p, int q)
        {
            int pid = data[p].ID;
            int qid = data[q].ID;
            foreach (var dataLocal in data) // For Every Data 
            {
                if (dataLocal.ID == pid) // Who used P Component replace to Q
                {
                    dataLocal.ID = data[q].ID;
                    dataLocal.linkto = data[q];
                }
            }
        }
        public bool connected(int p, int q) // P and Q Same Component ?
        {
            if (data[p] == data[q])
            {
                return true;
            }
            else
            {                
                return false;                
            }
        }

    }
</pre> 

ที่ยกตัวอย่างเป็น Class connection เพราะ อยากให้ทราบถึงตอนไปใช้งานจริงซึ่งอาจจะเป็น Object ซะมากกว่าที่จะเป็น Int [] เพราะเราสามารถนำ Code นี้ไปเก็บโครงสร้างของ Union ได้ทันที
ส่วนฟังก์ขชั่นที่มีหน้าที่เรียก็คือ ชุด Main นี้ โดยได้กำหนดให้มีจำนวน N อยู่ 10 =  N-1 (0-9)

 
<pre class="lang:default decode:true " >        static void Main(string[] args)
        {
            int N = 10;
            UF uf = new UF(N);
            Console.WriteLine("Press any key to start:......");
            while (!(System.Console.ReadKey().Key == ConsoleKey.F10))
            {
                Console.Write("P:");
                int p = int.Parse(Console.ReadKey().KeyChar.ToString());
                Console.WriteLine("");
                Console.Write("Q:");
                int q = int.Parse(Console.ReadKey().KeyChar.ToString());
                Console.WriteLine("");
                if (!uf.connected(p, q))
                {
                    uf.union(p, q);
                    Console.WriteLine("Union Node");
                }
                else
                {
                    Console.WriteLine("SameNode");
                }
                Console.WriteLine("========== Connected ============");
                Console.WriteLine("Press any key to continue:......");
            }


        }</pre> 


ลองทดสอบเชื่อม N ดูโดยให้ค่า P/Q  ข้อเสียของการเขียนแบบนี้ ถ้า Array มีขนาดใหญ่มากๆ มันต้อง Foreach จนครบ เพื่อเปลี่ยนค่าการเชื่อมต่อ ซึ่งไม่แนะนำในการใช้งานขนาดใหญ่ แต่อย่างที่รู้กันคอมพิวเตอร์สมัยนี้เร็วมาก จนเราอาจจะไม่จำเป็นต้องคิดถึงมัน รวมถึงขนาด  Memory ก็ใหญ่ตาม การประมวลผลเล็กๆแบบนี้จึงไม่ได้มีความลำบากอะไรมากมาย แต่ในตอนต่อๆ ไปเราจะหาวิธีการที่ทำให้ความเร็วให้ก้ับการประมวลผลนั้นรวดเร็วขึุ้น ติดตามต่อตอนต่อไปนะครับ

