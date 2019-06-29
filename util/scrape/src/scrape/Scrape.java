package scrape;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.DomElement;
import com.gargoylesoftware.htmlunit.html.DomNode;
import com.gargoylesoftware.htmlunit.html.DomNodeList;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class Scrape {

	public static void main(String[] args) throws IOException, InterruptedException {
		
		ArrayList<Plan> objects = new ArrayList<Plan>();
		HtmlPage page;
		HtmlPage requirementsPage;
	    final WebClient webClient = new WebClient();
	    
	    page = webClient.getPage("https://www.acs.ncsu.edu/php/coursecat/degree_requirements.php");
	    webClient.waitForBackgroundJavaScript(2000);
	    
	    DomNodeList<DomNode> panels = page.querySelectorAll(".panel");
	    for (DomNode panel : panels) {
	    	DomNode drop = panel.querySelector("[data-parent=\"#degrees\"]");
	    	((DomElement) drop).click();
	    	webClient.waitForBackgroundJavaScript(2000);
	    	DomNodeList<DomNode> plans = panel.querySelectorAll(".requirement-link");
	    	for (DomNode plan : plans) {
	    		Plan obj;
	    		String shortName;
	    		String longName;
	    		ArrayList<String> courseList = new ArrayList<String>();
	    		requirementsPage = ((DomElement) plan).click();
	    		webClient.waitForBackgroundJavaScript(2000);
	    		DomNodeList<DomNode> courses = requirementsPage.querySelectorAll(".course-link");
	    		for (DomNode course : courses) {
	    			String longCourse = course.asText();
	    			courseList.add(longCourse.substring(0, longCourse.indexOf("-")).replaceAll("\\s",""));
	    		}
	    		String name = requirementsPage.querySelector("#plan-name-heading>p").asText();
	    		shortName = name.substring(name.indexOf("(") + 1, name.indexOf(")"));
	    		longName = name.substring(0, name.indexOf("("));
	    		obj = new Plan(shortName, longName, courseList);
	    		
//	    		// Verify Object is added correctly
//	    		System.out.println(obj.longName);
//	    		// Done Verifying
	    		
	    		objects.add(obj);
	    	}
	    }
	    convertToJSON(objects);
	    webClient.close();
	}
	
	private static void convertToJSON(ArrayList<Plan> objects) throws IOException {
		BufferedWriter out = null;
		System.out.println(objects.size());
		try {
		    FileWriter fstream = new FileWriter("C:/Users/mattt/Development/classOverlap/web/src/assets/plans.json"); //true tells to append data.
		    out = new BufferedWriter(fstream);
		    out.write("[\n");
		    for (int j = 0; j < objects.size(); j++) {
		    	Plan obj = objects.get(j);
		    	out.write("\t{\n");
		    	out.write("\t\t\"shortName\": \"" + obj.shortName + "\",\n");
		    	out.write("\t\t\"longName\": \"" + obj.longName + "\",\n");
		    	out.write("\t\t\"courseList\": [\n");
		    	for (int i = 0; i < obj.courseList.size(); i++) {
		    		out.write("\t\t\t\"" + obj.courseList.get(i) + "\"");
		    		if (i != obj.courseList.size() - 1) {
		    			out.write(",");
		    		}
		    		out.write("\n");
		    	}
		    	out.write("\t\t]\n\t}");
		    	if (j != objects.size() - 1) {
		    		out.write(",");
		    	}
		    	out.write("\n");
		    }
		    out.write("]");
		}

		catch (IOException e) {
		    System.err.println("Error: " + e.getMessage());
		}

		finally {
		    if(out != null) {
		        out.close();
		    }
		}
	}
	
	private static class Plan {
		private String shortName;
		private String longName;
		private ArrayList<String> courseList;
		
		Plan(String shortName, String longName, ArrayList<String> courseList) {
			setShortName(shortName);
			setLongName(longName);
			setCourseList(courseList);
		}

		private void setCourseList(ArrayList<String> courseList) {
			this.courseList = courseList;
		}

		private void setLongName(String longName) {
			this.longName = longName;
		}

		private void setShortName(String shortName) {
			this.shortName = shortName;
		}
	}
	
}
