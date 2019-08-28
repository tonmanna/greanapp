---
title: มาสร้าง Automation Script แบบง่ายๆ กันด้วย Scripty
date: 2016-08-02T02:41:17
description: Scripty An alternative to T4 for compile-time code generation using the power of Roslyn scripting http#//daveaglick.com/posts/announcing-scriptyusing Microsoft.CodeAnalysis;using System.Collections.Ge
---

Scripty An alternative to T4 for compile-time code generation using the power of Roslyn scripting
 <a href="http://daveaglick.com/posts/announcing-scripty">http://daveaglick.com/posts/announcing-scripty</a>

<pre class="lang:default decode:true " >
using Microsoft.CodeAnalysis;
using System.Collections.Generic;

string className = "SchemaData";
string variableType = "string";

Dictionary<string, string> obj = new Dictionary<string, string>();
obj.Add("DomainID", "Schema.ObjectId");
obj.Add("ComponentID", "Schema.ObjectId");
obj.Add("imgType", "Number");

Output.WriteLine($@"class {className}
{{");
foreach (var entry in obj)
{
    Output.Write("\t");
    switch (entry.Value)
    {
        case "Schema.ObjectId":
            variableType = "string";
            break;
        case "Number":
            variableType = "int";
            break;
        default: variableType = "string";
            break;
    }
    Output.WriteLine($@"public {variableType} {entry.Key} {{ get; set; }}");
}
Output.WriteLine("}");

// Java Script Schema Generator

Output[className + ".js"].WriteLine($@"var {className}Schema = new Schema({{");
foreach (var entry in obj)
{
    Output[className + ".js"].Write("\t");
    Output[className + ".js"].Write($@"{entry.Key} : {entry.Value}");
    if (entry.Key != "imgType")
    {
        Output[className + ".js"].WriteLine(",");
    }
    else
    {
        Output[className + ".js"].WriteLine("");
    }

}
Output[className + ".js"].WriteLine($@"}});");


</pre> 


 
Auto generate Schema Mongoose
<pre class="lang:default decode:true " >var SchemaDataSchema = new Schema({
	DomainID : Schema.ObjectId,
	ComponentID : Schema.ObjectId,
	imgType : Number
});
</pre> 


Auto generate C# Class 
<pre class="lang:default decode:true " >class SchemaData
{
	public string DomainID { get; set; }
	public string ComponentID { get; set; }
	public int imgType { get; set; }
}
</pre> 

