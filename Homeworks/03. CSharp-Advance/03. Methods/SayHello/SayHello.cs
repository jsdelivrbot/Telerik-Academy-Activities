﻿using System;

class SayHello
{
    static void Main()
    {
        string name = Console.ReadLine();
        PrintName(name);
    }
    
    static void PrintName(string name)
    {
        Console.WriteLine("Hello, {0}!", name);
    }
}
